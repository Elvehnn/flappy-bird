import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";
import { MAP_NAME_TO_THEME } from "@/constants/appTheme";
import { ThemeNames, ThemeObject } from "./typings";

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: MAP_NAME_TO_THEME[ThemeNames.Dark] as ThemeObject,
    },
    reducers: {
        setTheme: (state, { payload }: PayloadAction<ThemeObject>) => {
            state.theme = payload;
        },
    },
});

export const themeSelectors = {
    all: (state: RootState) => state.theme,
};

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
