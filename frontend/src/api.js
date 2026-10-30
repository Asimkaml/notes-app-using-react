const BASE = import.meta.env.VITE_API_BASE;

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const messageForStatus = (status) => {
    if (status === 400) return "Bad request. Check what you typed.";
    if (status === 401) return "Please log in again.";
    if (status === 404) return "Not found. Maybe already deleted.";
    if (status === 409) return "That already exists.";
    if (status >= 500) return "Server problem. Try again soon.";
    return "Something went wrong.";
}

export async function api(path, { method = "GET", body } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });
  } catch {
    throw new ApiError("Cannot reach server. Check connection.", 0);
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no body (like 204). fine.
  }

  if (!res.ok) {
    if (res.status === 401 && !path.startsWith("/api/auth/") && onUnauthorized) {
      onUnauthorized();
    }
    throw new ApiError(data?.message || messageForStatus(res.status), res.status);
  }
  return data;
}

let onUnauthorized = null;
export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};