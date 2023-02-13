import { ForumComment, ForumTheme, ResponseStatus } from "@/api/typesApi";
import { AxiosError } from "axios";
import axios from "./axiosSetup";
import { ENDPOINTS } from "@/constants/apiPaths";

const headers  = {
  "Accept": "application/json",
  "Access-Control-Allow-Origin": "*",
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
}


export const getAllThemes = async () =>
    await axios.get<ForumTheme[]>(
        `http://localhost:5000/${ENDPOINTS.FORUM.THEMES}`
    );

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
    await axios.get<ForumComment[]>(
        `http://localhost:5000/${ENDPOINTS.FORUM.COMMENTS}/${id}`
    );

export const addComment = async (
    themeId: string,
    body: string,
    created_by: number
): Promise<ResponseStatus | AxiosError> =>
    await axios.post(
        `http://localhost:5000/${ENDPOINTS.FORUM.COMMENTS}/${themeId}`,
        {
            theme_id: themeId,
            body,
            created_by,
            created: new Date(),
        }
    );
