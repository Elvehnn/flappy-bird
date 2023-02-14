import { addPreferences, getPreferences } from "@/api/UserPreferencesApi";
import { MAP_NAME_TO_THEME } from "@/constants/appTheme";
import { themeActions } from "@/store/slices/theme/themeSlice";
import { ThemeNames } from "@/store/slices/theme/typings";
import { AppDispatch } from "@/store/store";
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

export const saveUserPreferences = (
    preferences: Nullable<ThemeNames>,
    dispatch: AppDispatch,
    userId: number
) => {
    if (preferences) {
        dispatch(themeActions.setTheme(MAP_NAME_TO_THEME[preferences]));

        localStorage.setItem(`${userId}_theme`, preferences);
    } else {
        localStorage.setItem(`${userId}_theme`, ThemeNames.Dark);

        addUserPreferences(userId, ThemeNames.Dark);
    }
};
