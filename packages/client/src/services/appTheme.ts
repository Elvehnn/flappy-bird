import { addPreferences, getPreferences } from "@/api/UserPreferencesApi";
import { hasApiReturnedError } from "@/utils/hasApiReturnedError";
import axios from "axios";

export const getUserPreferences = async (userId: number) => {
    try {
        const response = await getPreferences(userId);

        if (hasApiReturnedError(response) || axios.isAxiosError(response)) {
            return null;
        }

        return response.data;
    } catch (error) {
        return null;
    }
};

export const addUserPreferences = async (
    userId: number,
    app_theme_name: string
) => {
    try {
        const response = await addPreferences(userId, app_theme_name);

        if (hasApiReturnedError(response) || axios.isAxiosError(response)) {
            return null;
        }

        return response.data;
    } catch (error) {
        return null;
    }
};
