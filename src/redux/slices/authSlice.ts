import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';
import { organizationApi } from '../../services/organizationApi';
import { userStorage, organizationStorage, cookieStorage } from '../../services/storage';
import type { User, Organization } from '../../types';
import type { OrganizationListResponse } from '../../services/organizationApi';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  organization: Organization | null;
  organizations: OrganizationListResponse[];
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  organization: null,
  organizations: [],
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await authApi.login(credentials);
      const { accessToken, refreshToken } = response.data.data;

      console.log("user logged in");

      // Store tokens
      cookieStorage.setAccessToken(accessToken);
      cookieStorage.setRefreshToken(refreshToken);

      // Fetch user profile after login
      const profileResponse = await authApi.getProfile();
      const userData = profileResponse.data.data;

      console.log("user data:", userData);

      // Store user data in localStorage
      userStorage.setUserData(userData);
      organizationStorage.setOrganization(null);

      return {
        accessToken,
        refreshToken,
        user: userData,
        organization: null,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      organizationName: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.signup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        organization: {
          name: data.organizationName,
        },
      });
      const { user, organization, tokens } = response.data.data;
      
      // Store tokens
      cookieStorage.setAccessToken(tokens.accessToken);
      cookieStorage.setRefreshToken(tokens.refreshToken);
      
      // Store user data
      userStorage.setUserData(user);
      organizationStorage.setOrganization(organization);
      
      return {
        user,
        organization,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const storedRefreshToken = cookieStorage.getRefreshToken();
      if (!storedRefreshToken) {
        return rejectWithValue('No refresh token available');
      }
      const response = await authApi.refreshToken({ refreshToken: storedRefreshToken });
      const { accessToken, refreshToken } = response.data.data;
      
      // Update tokens in storage
      cookieStorage.setAccessToken(accessToken);
      cookieStorage.setRefreshToken(refreshToken);
      
      return { accessToken, refreshToken };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Token refresh failed');
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getProfile();
      const userData = response.data.data;
      
      // Update user data in storage
      userStorage.setUserData(userData);
      // organizationStorage.setOrganization(userData.organization);
      
      return {
        user: userData.user,
        organization: userData.organization,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = cookieStorage.getRefreshToken();
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    } finally {
      // Clear storage regardless of API call success
      cookieStorage.removeAccessToken();
      cookieStorage.removeRefreshToken();
      userStorage.removeUserData();
      organizationStorage.removeOrganization();
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(email);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Forgot password failed');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: { token: string; newPassword: string }, { rejectWithValue }) => {
    try {
      await authApi.resetPassword(data);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Reset password failed');
    }
  }
);

export const getUserOrganizations = createAsyncThunk(
  'auth/getUserOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await organizationApi.getUserOrganizations();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch organizations');
    }
  }
);

export const createOrganization = createAsyncThunk(
  'auth/createOrganization',
  async (data: { name: string; slug?: string }, { rejectWithValue }) => {
    try {
      const response = await organizationApi.createOrganization(data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create organization');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.organization = null;
      state.organizations = [];
      state.token = null;
      state.refreshToken = null;
      state.error = null;
    },
    setUserFromStorage: (state, action) => {
      state.user = action.payload.user;
      state.organization = action.payload.organization;
      state.isAuthenticated = true;
    },
    switchOrganization: (state, action) => {
      const orgId = action.payload;
      const selectedOrg = state.organizations.find((org) => org.id === orgId);
      if (selectedOrg) {
        state.organization = {
          id: selectedOrg.id,
          name: selectedOrg.name,
          slug: selectedOrg.slug,
        };
        if (state.user) {
          userStorage.setUserData(state.user);
          organizationStorage.setOrganization(state.organization);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.organization = action.payload.organization;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.organization = action.payload.organization;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.organization = null;
        state.token = null;
        state.refreshToken = null;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.organization = action.payload.organization;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.organization = null;
        state.token = null;
        state.refreshToken = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = action.payload;
      })
      .addCase(getUserOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations.push({
          id: action.payload.id,
          name: action.payload.name,
          slug: action.payload.slug,
          role: 'OWNER',
          createdAt: action.payload.createdAt,
        });
        state.organization = {
          id: action.payload.id,
          name: action.payload.name,
          slug: action.payload.slug,
        };
        if (state.user) {
          userStorage.setUserData(state.user);
          organizationStorage.setOrganization(state.organization);
        }
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, logoutSuccess, switchOrganization, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
