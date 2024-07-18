import { revalidatePath } from "next/cache";
import {
  BASE_URL,
  Bus,
  BUS_OPERATIONAL_STATUS,
  PagedResponse,
} from "../definitions";
import { FetchError } from "../FetchError";

export type FetchBusParams = {
  page?: number;
  size?: number;
  query?: string;
  sortDirection?: string;
  operationalStatus?: BUS_OPERATIONAL_STATUS;
};

// Function to fech a bus
export async function fetchBus(
  token: string,
  requestBody: FetchBusParams
): Promise<PagedResponse<Bus>> {
  const apiUrl = new URL(`${BASE_URL}/bus/list`);

  // Construct the headers, including the Authorization header if the token is provided
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      if (response.status == 401) {
        throw new FetchError(
          response.status,
          `Unauthorized: ${response.statusText}`
        );
      }
      throw new FetchError(
        response.status,
        `Failed to fetch bus: ${response.statusText}`
      );
    }

    // Return the parsed JSON response
    return await response.json();
  } catch (error) {
    // Handle custom FetchError
    if (error instanceof FetchError) {
      return Promise.reject({
        status: error.status,
        message: error.message,
      });
    }
    // Handle generic errors
    return Promise.reject({
      status: 500,
      message: "Internal Server Error",
    });
  }
}