/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";

export const handleApiError = (error: any) => {
  if (import.meta.env.NODE_ENV !== "production") {
    console.warn("[Axios Error....]", error);
  }

  if (isAxiosError(error)) {
    const { response } = error;
    switch (response?.status) {
      case 400:
        return (
          response?.data?.message ||
          (response?.data.error && JSON.stringify(response?.data.error)) ||
          response?.data ||
          response?.data.detail ||
          "Bad Request"
        );
      case 401:
        return "Unauthorized User!";
      case 403:
        return "Forbidden";
      case 404:
        return response?.data.message || response?.data || "Resource not found";
      case 409:
        return response?.data || "A duplicate already exists";
      case 422:
        return response?.data;
      case 500:
        return "Something went wrong at our end";
      default:
        return response?.data || "Something went wrong";
    }
  } else {
    const { message } = error;
    return message;
  }
};
