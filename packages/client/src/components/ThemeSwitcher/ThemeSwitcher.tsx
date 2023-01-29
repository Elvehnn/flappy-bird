import { Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/lib/switch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { themeActions, themeSelectors } from "@/store/slices/theme/themeSlice";
import "./ThemeSwitcher.scss";
import { MAP_NAME_TO_THEME } from "@/constants/appTheme";

export const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(themeSelectors.all);
    const { name, design } = theme;

    const isThemeDark = name === "DARK";

    const toggleTheme: SwitchChangeEventHandler = (checked, e) => {
        e.stopPropagation();

        const newTheme = checked ? "DARK" : "LIGHT";
        localStorage.setItem("theme", newTheme);

        dispatch(themeActions.setTheme(MAP_NAME_TO_THEME[newTheme]));
    };

    return (
        <Switch
            className="theme-switch"
            onChange={toggleTheme}
            checked={isThemeDark}
            style={{
                backgroundColor: isThemeDark
                    ? design.token.colorLight
                    : design.token.colorLink,
            }}
        />
    );
};