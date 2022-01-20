
export const getEnvironmentVariable = (variable: string): string => {
  const value: string | undefined = process.env[variable];
  if (!value) {
    console.log(`Missing environment variable ${variable}`);
    throw new Error(`Missing environment variable ${variable}`);
  }
  return value;
};
