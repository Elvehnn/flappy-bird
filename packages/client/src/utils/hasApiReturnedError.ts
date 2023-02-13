import { APIError } from "@/api/typesApi";

export const hasApiReturnedError = (
    response: unknown | APIError
): response is APIError => {
    if (response) {
        return Object.prototype.hasOwnProperty.call(response, "reason");
    }

    return false;
};
