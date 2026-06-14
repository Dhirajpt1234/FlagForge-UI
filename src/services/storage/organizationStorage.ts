import type { Organization } from '../../types';

const ORGANIZATION_DATA_KEY = 'flagforge_organization_data';

export const organizationStorage = {
  setOrganization: (organization: Organization | null): void => {
    try {
      if (organization === null) {
        localStorage.removeItem(ORGANIZATION_DATA_KEY);
      } else {
        const serializedData = JSON.stringify(organization);
        console.log("organization data in serialized", serializedData);
        localStorage.setItem(ORGANIZATION_DATA_KEY, serializedData);
      }
    } catch (error) {
      console.error('Error storing organization data in localStorage:', error);
    }
  },

  getOrganization: (): Organization | null => {
    const data = localStorage.getItem(ORGANIZATION_DATA_KEY);
    if (data === null) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing organization data from localStorage:', error);
      return null;
    }
  },

  removeOrganization: (): void => {
    localStorage.removeItem(ORGANIZATION_DATA_KEY);
  },
};

export default organizationStorage;
