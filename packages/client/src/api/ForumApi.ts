import { ForumComment, ForumTheme, ResponseStatus } from "@/api/typesApi";
import { AxiosError } from "axios";
import axios from "./axiosSetup";
import { ENDPOINTS } from "@/constants/apiPaths";

export const getAllThemes = async () =>
  await axios.get<ForumTheme[]>(`http://localhost:5000/${ENDPOINTS.FORUM.THEMES}`);

export const addTheme = async (
    mainThemeId: number,
    title: string,
    description: string
): Promise<ResponseStatus | AxiosError> =>
    await axios.post(`http://localhost:5000/${ENDPOINTS.FORUM.THEMES}`, {
        main_theme_id: mainThemeId,
        title,
        description,
        created: new Date(),
    });

export const getAllThemeComments = async (id: number) =>
    await axios.get<ForumComment[]>(`http://localhost:5000/${ENDPOINTS.FORUM.COMMENTS}/${id}`);

export const addComment = async (
    themeId: string,
    body: string,
    created_by: number,
): Promise<ResponseStatus | AxiosError> =>
    await axios.post(`http://localhost:5001/${ENDPOINTS.FORUM.COMMENTS}/${themeId}`, {
        theme_id: themeId,
        body,
        created_by,
        created: new Date(),
    });
