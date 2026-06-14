import { apiService } from './api';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationListResponse {
  id: string;
  name: string;
  slug: string;
  role: string;
  createdAt: string;
}

export interface CreateOrganizationRequest {
  name: string;
  slug?: string;
}

export const organizationApi = {
  getUserOrganizations: () =>
    apiService.get<OrganizationListResponse[]>('/api/organizations/v1/organizations'),

  createOrganization: (data: CreateOrganizationRequest) =>
    apiService.post<Organization>('/api/organizations/v1/organizations', data),
};

export default organizationApi;
