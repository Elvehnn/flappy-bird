import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ForumComment, ForumTheme } from "@/api/typesApi";
import { RootState } from "@/store/store";

interface InitialState {
    themes: Record<string, ForumTheme[]> | null,
    comments: Record<string, ForumComment[] | null>
}

const initialState: InitialState = {
    themes: {},
    comments: {},
};

export const leaderboardSlice = createSlice({
    name: "forum",
    initialState,
    reducers: {
        setThemes: (
            state,
            { payload }: PayloadAction<Record<string, ForumTheme[]> | null>
        ) => {
            state.themes = payload;
        },
        setComments: (
            state,
            { payload }: PayloadAction<CommentPayload>
        ) => {
            state.comments[payload.themeId] = payload.comments;
        },
    },
});

interface CommentPayload {
    comments: ForumComment[] | null;
    themeId: number;
}

export const forumSelector = {
    themes: (state: RootState) => state.forum.themes,
    comments: (state: RootState) => state.forum.comments,
};

export const forumActions = leaderboardSlice.actions;
export const forumReducer = leaderboardSlice.reducer;
