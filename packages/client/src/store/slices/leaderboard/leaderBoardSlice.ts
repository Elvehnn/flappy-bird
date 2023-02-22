import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LadderScore } from "@/api/typesApi";
import { RootState } from "@/store/store";
import { addLadder, getLadder, getUserScoreInfo } from "@/api/LeaderboardApi";

interface InitialState {
    data: LadderScore[];
    fetching: boolean;
    userScoreInfo: LadderScore;
}

const initialState: InitialState = {
    data: [],
    fetching: false,
    userScoreInfo: {} as LadderScore,
};

export const extraActions = {
    get: createAsyncThunk(
        "pages/leaderboard/get",
        async () => await getLadder()
    ),
    addScore: createAsyncThunk(
        "pages/leaderboard/add",
        async ({ ladder_id, user_name, count }: LadderScore) =>
            await addLadder(ladder_id, user_name, count)
    ),
    getUserScoreInfo: createAsyncThunk(
        "pages/leaderboard/add",
        async (id: number) => await getUserScoreInfo(id)
    ),
};

export const leaderboardSlice = createSlice({
    name: "leaders",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(extraActions.get.pending, state => {
                state.fetching = true;
            })
            .addCase(extraActions.get.fulfilled, (state, action) => {
                state.fetching = false;

                state.data = action.payload.data.sort(
                    (a: LadderScore, b: LadderScore) => b.count - a.count
                );
            })
            .addCase(extraActions.get.rejected, state => {
                state.fetching = false;
            })
            .addCase(extraActions.getUserScoreInfo.pending, state => {
                state.fetching = true;
            })
            .addCase(
                extraActions.getUserScoreInfo.fulfilled,
                (state, action) => {
                    state.fetching = false;
                    state.userScoreInfo = action.payload.data;
                }
            )
            .addCase(extraActions.getUserScoreInfo.rejected, state => {
                state.fetching = false;
            });
    },
});

export const leaderboardSelector = {
    leaders: (state: RootState) => state.leaderboard,
};

export const leaderboardActions = {
    ...leaderboardSlice.actions,
    ...extraActions,
};
export const leaderboardReducer = leaderboardSlice.reducer;
