import axios from "./axiosSetup";
import { ENDPOINTS, PATH } from "@/constants/apiPaths";
import { ThemeNames } from "@/store/slices/theme/typings";

export const getPreferences = async (userId: number) =>
    await axios.get<ThemeNames>(
        `${PATH.MAIN}${ENDPOINTS.USER_PREFERENCES}/${userId}`
    );

export const addPreferences = async (userId: number, app_theme_name: string) =>
    await axios.post(`${PATH.MAIN}${ENDPOINTS.USER_PREFERENCES}/${userId}`, {
        userId,
        app_theme_name,
    });
