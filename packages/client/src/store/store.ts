import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/store/slices/user/userSlice";
import { leaderboardReducer } from "@/store/slices/leaderboard/leaderBoardSlice";
import { themeReducer } from "@/store/slices/theme/themeSlice";
import { forumReducer } from "@/store/slices/forum/forumSlice";
import { MAP_NAME_TO_THEME } from "@/constants/appTheme";
import { ThemeNames } from "./slices/theme/typings";

export const PRELOADED_STATE =
    typeof window !== "undefined"
        ? window.__PRELOADED_STATE__
        : {
              user: null,
              theme: MAP_NAME_TO_THEME[ThemeNames.Dark],
              leaderboard: null,
              forum: null,
          };

export const createStore = (
    preloadedState: Record<string, unknown> | undefined
) => {
    return configureStore({
        reducer: {
            user: userReducer,
            leaderboard: leaderboardReducer,
            theme: themeReducer,
            forum: forumReducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({ serializableCheck: false }),
        preloadedState,
    });
};

const store = createStore(PRELOADED_STATE);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
