const env = process.env;

export interface EnvConfig {
  REACT_APP_API_BASE_URL: string;
} 

// Using a function so that developers do not unintentionally overwrite values
export const getEnvironmentConfig = (): EnvConfig => ({
  REACT_APP_API_BASE_URL: env.REACT_APP_API_BASE_URL as string // cast from (string | undefined)
});

export default getEnvironmentConfig;
