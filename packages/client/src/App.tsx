import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LadderPage from "./pages/LadderPage/LadderPage";
import LoginPage from "./pages/login/LoginPage";
import { SignUpPage } from "./pages/signUp/SignUpPage";
import ForumPage from "./pages/ForumPage/ForumPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ProfileChangePage } from "./pages/profile-change/ProfileChangePage";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { getYandexToken } from "./services/oAuthYandex";
import StartPage from "./pages/StartPage/StartPage";
import { ROUTE_PATH } from "./constants/routePaths";

export const App = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const GamePage = lazy(() =>
        import("./pages/GamePage/GamePage").then(module => ({
            default: module.default,
        }))
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            const code = new URLSearchParams(window.location.search).get(
                "code"
            );

            if (code) {
                getYandexToken(code, navigate, dispatch);
            }
        }
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path={ROUTE_PATH.START} element={<StartPage />} />
                <Route
                    path={ROUTE_PATH.GAME}
                    element={
                        <Suspense fallback={<>Загрузка...</>}>
                            <GamePage />
                        </Suspense>
                    }
                />
                <Route path={ROUTE_PATH.SIGNIN} element={<LoginPage />} />
                <Route path={ROUTE_PATH.SIGNUP} element={<SignUpPage />} />
                <Route path={ROUTE_PATH.FORUM} element={<ForumPage />} />
                <Route path={ROUTE_PATH.LEADERBOARD} element={<LadderPage />} />
                <Route path={ROUTE_PATH.PROFILE} element={<ProfilePage />} />
                <Route
                    path={ROUTE_PATH.PROFILE_CHANGE}
                    element={<ProfileChangePage />}
                />
                <Route path={ROUTE_PATH.ERROR} element={<div>error404</div>} />
            </Routes>
        </div>
    );
};

export default App;
