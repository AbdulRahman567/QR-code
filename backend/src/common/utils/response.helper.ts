/**
 * Shape of every response returned by the API.
 * Keeping this consistent makes the frontend's handling
 * of both success and error cases predictable.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Builds a standardized success response.
 */
export function buildSuccessResponse<T>(
  message: string,
  data?: T,
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

/**
 * Builds a standardized error response.
 */
export function buildErrorResponse(message: string): ApiResponse<undefined> {
  return {
    success: false,
    message,
  };
}
