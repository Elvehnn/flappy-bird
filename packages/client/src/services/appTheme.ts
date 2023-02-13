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

export const setUserPreferences = async (id: number, dispatch: AppDispatch) => {
    try {
        const preferences = await getUserPreferences(id);

        if (preferences) {
            dispatch(
                themeActions.setTheme(
                    MAP_NAME_TO_THEME[preferences as ThemeNames]
                )
            );
        }
    } catch (error) {
        console.log(error);
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
