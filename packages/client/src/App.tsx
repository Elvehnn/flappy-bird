import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LadderPage from "@/pages/LadderPage/LadderPage";
import LoginPage from "@/pages/login/LoginPage";
import { SignUpPage } from "@/pages/signUp/SignUpPage";
import ForumPage from "@/pages/ForumPage/ForumPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { ProfileChangePage } from "@/pages/profile-change/ProfileChangePage";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getYandexToken } from "@/services/oAuthYandex";
import StartPage from "@/pages/StartPage/StartPage";
import { ErrorBoundary } from "@/pages/errorPages/ErrorBoundary";
import { ConfigProvider } from "antd";
import { themeSelectors } from "@/store/slices/theme/themeSlice";
import MainLayout from "@/containers/MainLayout/MainLayout";
import MainThemePage from "@/pages/ForumPage/pages/MainThemePage/MainThemePage";
import ThemePage from "@/pages/ForumPage/pages/ThemePage/ThemePage";
import Preloader from "@/components/Preloader/Preloader";
import { getAuthorizedUser } from "@/utils/getAuthorizedUser";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { userSelectors } from "@/store/slices/user/userSlice";
import Team from "@/pages/Team/Team";

export const App = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(themeSelectors.all);
    const { user } = useAppSelector(userSelectors.all);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const GamePage = lazy(() =>
        import("./pages/GamePage/GamePage").then(module => ({
            default: module.default,
        }))
    );

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const code = new URLSearchParams(window.location.search).get(
                "code"
            );

            if (code) {
                getYandexToken(code, dispatch);
            }
        }
    }, []);

    useEffect(() => {
        getAuthorizedUser(dispatch);
    }, []);

    if (isLoaded) {
        return (
            <ConfigProvider theme={theme.design}>
                <ErrorBoundary>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<StartPage />} />
                            <Route
                                path="/game"
                                element={
                                    <Suspense
                                        fallback={
                                            <MainLayout>
                                                <>Загрузка</>
                                            </MainLayout>
                                        }>
                                        <GamePage />
                                    </Suspense>
                                }
                            />
                            <Route path="/sign-in" element={<LoginPage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                            <Route
                                path="/forum"
                                element={
                                    <ProtectedRoute isAuth={user}>
                                        <ForumPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/forum/:mainThemeId"
                                element={<MainThemePage />}
                            />
                            <Route
                                path="/forum/:mainThemeId/:themeId"
                                element={<ThemePage />}
                            />
                            <Route
                                path="/ladder"
                                element={
                                    <ProtectedRoute isAuth={user}>
                                        <LadderPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute isAuth={user}>
                                        <ProfilePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile-change"
                                element={
                                    <ProtectedRoute isAuth={user}>
                                        <ProfileChangePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/team" element={<Team />} />
                            <Route path="/*" element={<div>error404</div>} />
                        </Routes>
                    </div>
                </ErrorBoundary>
            </ConfigProvider>
        );
    } else {
        return <></>;
    }

    return <Preloader />;
};

export default App;
