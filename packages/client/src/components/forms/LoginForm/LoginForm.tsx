import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";
import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/store/slices/user/userSlice";
import { getUserInfo, signin } from "@/services/authorization";
import "./LoginForm.scss";
import { LOGIN_FORM_VALIDATION_SCHEMA } from "./loginFormValidationSchema";
import { signinWithYandex } from "@/services/oAuthYandex";
import { ThemeNames } from "@/store/slices/theme/typings";
import { getUserPreferences, saveUserPreferences } from "@/services/appTheme";
import { useNotification } from "@/hooks/useNorification";

export type LoginFormValuesType = {
    login: string;
    password: string;
};

const initialFormValues = {
    login: "",
    password: "",
};

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [openNotification, contextHolder] = useNotification();
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (
        values: LoginFormValuesType,
        helpers: { resetForm: (arg0: { values: LoginFormValuesType }) => void }
    ) => {
        setIsLoading(true);

        const isLoggedIn = await signin(values);

        openNotification({
            status: isLoggedIn ? 200 : 401,
        });

        if (isLoggedIn) {
            const userFormServer = await getUserInfo();

            if (userFormServer) {
                localStorage.setItem("user", JSON.stringify(userFormServer));
                dispatch(userActions.setUser(userFormServer));

                const preferences = (await getUserPreferences(
                    userFormServer.id
                )) as Nullable<ThemeNames>;

                saveUserPreferences(preferences, dispatch, userFormServer.id);

                navigate("/");
            }
        }

        helpers.resetForm({
            values,
        });

        setIsLoading(false);
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        onSubmit: submitHandler,
        validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
    });

    const onInputChange = (
        name: string,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        formik.setFieldTouched(name);
        formik.setFieldValue(name, event.target.value);
    };

    const onFocus = (name: string) => {
        formik.setFieldTouched(name);
    };

    const handleYandexOauth = async () => {
        setIsLoading(true);

        const isLoggedIn = await signinWithYandex();

        openNotification({
            status: isLoggedIn ? 200 : 401,
        });

        setIsLoading(false);
    };

    return (
        <Form
            labelCol={{ flex: "86px" }}
            className="login-form"
            name="login-form"
            onFinish={formik.handleSubmit}
            autoComplete="off"
            size="large"
            data-testid="login-form">
            {contextHolder}
            <Form.Item
                className="login-form__item"
                label="Login"
                name="login"
                validateStatus={
                    formik.touched.login && formik.errors.login
                        ? "error"
                        : "success"
                }
                help={
                    formik.touched.login && formik.errors.login
                        ? formik.errors.login
                        : ""
                }>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Login"
                    value={formik.values.login}
                    onChange={e => onInputChange("login", e)}
                    onFocus={() => onFocus("login")}
                    data-testid="login-input"
                />
            </Form.Item>

            <Form.Item
                className="login-form__item"
                label="Password"
                name="password"
                validateStatus={
                    formik.touched.password && formik.errors.password
                        ? "error"
                        : "success"
                }
                help={formik.touched.password && formik.errors.password}>
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={e => onInputChange("password", e)}
                    data-testid="password-input"
                />
            </Form.Item>

            <div className="login-form__footer">
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    data-testid="signin-button"
                    disabled={isLoading}>
                    Sign in
                </Button>

                <p>or login with</p>
                <Button
                    type="ghost"
                    htmlType="button"
                    data-testid="yandex-button"
                    className="yandex-button"
                    disabled={isLoading}
                    onClick={handleYandexOauth}></Button>

                <NavLink to={"/sign-up"}>
                    <Button
                        type="link"
                        htmlType="button"
                        size="large"
                        data-testid="signup-button">
                        Create account
                    </Button>
                </NavLink>
            </div>
        </Form>
    );
};
