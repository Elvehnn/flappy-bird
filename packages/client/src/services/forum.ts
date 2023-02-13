import { addComment, addTheme, getAllThemeComments, getAllThemes } from "@/api/ForumApi";
import { ForumTheme } from "@/api/typesApi";

export const getThemes = async () => {
    try {
        const response = await getAllThemes();

        return response.data.reduce((acc: Record<string, ForumTheme[]>, theme: ForumTheme) => {
            if (!Object.prototype.hasOwnProperty.call(acc, theme.main_theme_id)) {
                acc[theme.main_theme_id] = [];
            }
            acc[theme.main_theme_id].push(theme);
            return acc;
        }, {})
    } catch (error) {
        return null;
    }
};

export const addNewTheme = async (
    mainThemeId: number,
    title: string,
    description: string
) => {
    try {
        return await addTheme(mainThemeId, title, description);
    } catch (error) {
        return null;
    }
};

export const getThemeComments = async (id: number) => {
    try {
        const response = await getAllThemeComments(id);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const addNewComment = async (
    themeId: string,
    body: string,
    createdBy: number
) => {
    try {
        return await addComment(themeId, body, createdBy);
    } catch (error) {
        return null;
    }
};


