import { UserFromServer } from "@/api/typesApi";
import { getUserInfo } from "@/services/authorization";
import { AppDispatch } from "@/store/store";
import { getStorageValue } from "@/utils/getStorageValue";
import { setUserPreferences } from "@/services/appTheme";
import { userActions } from "@/store/slices/user/userSlice";

export const getAuthorizedUser = async (dispatch: AppDispatch) => {
    let user: Nullable<UserFromServer> = getStorageValue("user", null);

    user = await getUserInfo();

    if (user) {
        dispatch(userActions.setUser(user));

        setUserPreferences(user.id, dispatch);
    }
};
