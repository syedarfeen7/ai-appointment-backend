export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const getEnvNumber = (key: string, defaultValue?: number): number => {
  const value = getEnv(key, defaultValue?.toString());
  const number = Number(value);
  if (isNaN(number)) {
    throw new Error(`Environment variable ${key} is not a valid number`);
  }
  return number;
};
