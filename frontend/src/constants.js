const rawBackendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.BACKEND_URL ||
  "http://localhost:8000";

const normalizedBackendUrl = rawBackendUrl.replace(/\/+$/, "");

export const BASE_URL = normalizedBackendUrl.endsWith("/api/v1")
  ? normalizedBackendUrl
  : `${normalizedBackendUrl}/api/v1`;
