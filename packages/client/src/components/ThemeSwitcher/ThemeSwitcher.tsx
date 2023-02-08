import { Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/lib/switch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { themeActions, themeSelectors } from "@/store/slices/theme/themeSlice";
import "./ThemeSwitcher.scss";
import { MAP_NAME_TO_THEME } from "@/constants/appTheme";
import LightThemeIcon from "../customIcons/LightThemeIcon";
import DarkThemeIcon from "../customIcons/DarkThemeIcon";
import { userSelectors } from "@/store/slices/user/userSlice";
import { addUserPreferences } from "@/services/appTheme";

export const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(themeSelectors.all);
    const { name, design } = theme;
    const { user } = useAppSelector(userSelectors.all);

    const isThemeDark = name === "DARK";

    const toggleTheme: SwitchChangeEventHandler = (checked, e) => {
        e.stopPropagation();

        const newTheme = checked ? "DARK" : "LIGHT";

        if (user) {
            localStorage.setItem(`${user.id}_theme`, newTheme);
            addUserPreferences(user.id, newTheme);
        }

        dispatch(themeActions.setTheme(MAP_NAME_TO_THEME[newTheme]));
    };

    return (
        <Switch
            className="switch"
            onChange={toggleTheme}
            checked={isThemeDark}
            style={{
                backgroundColor: isThemeDark
                    ? design.token.colorLight
                    : design.token.colorLink,
            }}
            checkedChildren={<LightThemeIcon style={{ color: "#fff" }} />}
            unCheckedChildren={<DarkThemeIcon style={{ color: "#fff" }} />}
        />
    );
};
