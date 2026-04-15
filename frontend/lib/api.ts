const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.oganiru.tech/api/v1";

export interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

async function post<T = ApiResponse>(endpoint: string, body: object): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (networkErr) {
    // Fetch itself threw — server is down, CORS blocked the preflight,
    // or NEXT_PUBLIC_API_URL is wrong / not set.
    console.error("[api] fetch failed — check that Laravel is running and NEXT_PUBLIC_API_URL is set", {
      url: `${API_BASE_URL}${endpoint}`,
      error: networkErr,
    });
    throw new Error("Network error");
  }

  // Log every response so you can see status codes in the browser console
  console.info(`[api] ${endpoint} → HTTP ${response.status}`);

  let data: T;
  try {
    data = await response.json();
  } catch {
    console.error("[api] Response was not valid JSON", { status: response.status });
    throw new Error("Invalid server response");
  }

  // 422 Validation errors, 429 Rate limit, 500 server errors all have a
  // message field from Laravel, so we return them instead of throwing.
  return data;
}

export const api = {
  contact: (payload: { email: string; message: string }) =>
    post<ApiResponse>("/contact", payload),

  subscribe: (payload: { email: string }) =>
    post<ApiResponse>("/subscribe", payload),
};