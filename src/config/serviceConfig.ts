export enum Service {
  AUTH = 'auth',
  RULE_ENGINE = 'rule-engine',
  ADMIN = 'admin',
}

export const SERVICE_BASE_URLS: Record<Service, string> = {
  [Service.AUTH]: process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:3002',
  [Service.RULE_ENGINE]: process.env.REACT_APP_RULE_ENGINE_SERVICE_URL || 'http://localhost:3003',
  [Service.ADMIN]: process.env.REACT_APP_ADMIN_SERVICE_URL || 'http://localhost:3004',
};

export const getServiceBaseUrl = (service: Service): string => {
  return SERVICE_BASE_URLS[service];
};

export const getServiceUrl = (service: Service, path: string): string => {
  const baseUrl = getServiceBaseUrl(service);
  return `${baseUrl}${path}`;
};
