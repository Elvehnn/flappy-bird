import axios from "./axiosSetup";
import { ENDPOINTS } from "@/constants/apiPaths";
import { ThemeNames } from "@/store/slices/theme/typings";

export const getPreferences = async (userId: number) =>
    await axios.get<ThemeNames>(
        `http://localhost:5000/${ENDPOINTS.USER_PREFERENCES}/${userId}`
    );

export const addPreferences = async (userId: number, app_theme_name: string) =>
    await axios.post(
        `http://localhost:5000/${ENDPOINTS.USER_PREFERENCES}/${userId}`,
        {
            userId,
            app_theme_name,
        }
    );
