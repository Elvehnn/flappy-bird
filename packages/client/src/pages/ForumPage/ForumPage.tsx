import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "@/containers/MainLayout/MainLayout";
import ContentContainer from "@/containers/ContentContainer/ContentContainer";
import MainTopicCard from "@/pages/ForumPage/components/MainTopicCard/MainTopicCard";
import { getThemes } from "@/services/forum";
import { forumActions, forumSelector } from "@/store/slices/forum/forumSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import "./ForumPage.scss";

const ForumPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getThemes().then(themes => dispatch(forumActions.setThemes(themes)));
    }, []);

    const themes = useAppSelector(forumSelector.themes);

    const title =
        <div className="forum-card__head">
            <span className="forum-card__title">Форум</span>
        </div>

    return (
        <MainLayout data-testid="forum-page">
            <ContentContainer title={title}>
                    <MainTopicCard
                      mainThemeId={1}
                      openTheme={() => navigate("/forum/1")}
                      title="НОВОСТИ"
                      themesCount={themes ? themes[1]?.length : 0}
                    />
                    <MainTopicCard
                      mainThemeId={2}
                      openTheme={() => navigate("/forum/2")}
                      title="ПРЕДЛОЖЕНИЯ ПО УЛУЧШЕНИЮ"
                      themesCount={themes ? themes[2]?.length : 0}
                    />
                    <MainTopicCard
                      mainThemeId={3}
                      openTheme={() => navigate("/forum/3")}
                      title="ТЕХНИЧЕСКАЯ ПОДДЕРЖКА"
                      themesCount={themes ? themes[3]?.length : 0}
                    />
            </ContentContainer>
        </MainLayout>
    );
};

export default ForumPage;
