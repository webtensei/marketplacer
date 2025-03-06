type EnvType = {
    API_BASE_URL: string;
    NODE_ENV: "development" | "docker" | "production";
  };
  export const env: EnvType = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    NODE_ENV: import.meta.env.VITE_NODE_ENV,
  };
  