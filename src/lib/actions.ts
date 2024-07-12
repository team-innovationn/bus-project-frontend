'use server'
import { BASE_URL } from "./definitions";
import { AuthRequest, AuthResponse } from "./definitions";
import { FetchError } from "./FetchError";
import { createSession } from "./session";
import { AUTH_URL } from "./urls";

export async function LoginUser(payload: AuthRequest): Promise<AuthResponse> {
    if (payload.email == null || payload.password == null) {
        return Promise.reject({
            status: 400,
            message: 'Bad credentials',
        });
    }

    console.log(payload)

    // Verify credentials && get the user
    const apiUrl = new URL(`${BASE_URL}${AUTH_URL}`);

    console.log(apiUrl);

    // Construct the headers
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        console.log(response);

        if (!response.ok) {
            throw new FetchError(response.status, `Failed to Login user: ${response.statusText}`);
        }

        const user = (await response.json() as AuthResponse);

        await createSession(user);

        return user;
    } catch (error) {
        // Custom error handling logic
        if (error instanceof FetchError) {
            return Promise.reject({
                status: error.status,
                message: error.message,
            });
        }
        return Promise.reject({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}