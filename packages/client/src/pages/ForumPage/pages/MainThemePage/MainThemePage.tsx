import { useParams } from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "@/containers/MainLayout/MainLayout";
import ContentContainer from "@/containers/ContentContainer/ContentContainer";
import TopicCard from "@/pages/ForumPage/components/TopicCard/TopicCard";
import { getThemeComments, getThemes } from "@/services/forum";
import { forumActions, forumSelector } from "@/store/slices/forum/forumSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ForumCardHead from "@/pages/ForumPage/components/ForumCardHead/ForumCardHead";
import { ForumTheme } from "@/api/typesApi";

const MainThemePage = () => {
    const dispatch = useAppDispatch();
    const params = useParams();

    const { mainThemeId } = params;

    const themes = useAppSelector(forumSelector.themes);
    const comments = useAppSelector(forumSelector.comments);

    const fetchThemesAll = async () => {
        if (!mainThemeId) return

        getThemes().then(themes => {
            if (!themes) return

            dispatch(forumActions.setThemes(themes));

            themes[mainThemeId].forEach((theme: ForumTheme) => {
                getThemeComments(theme.theme_id)
                    .then(comments => comments && dispatch(forumActions.setComments({ comments, themeId: theme.theme_id })));
            })
        })
    };

    useEffect(() => {
        fetchThemesAll();
    }, []);

    const title = <ForumCardHead  link="/forum" mainThemeId={mainThemeId as "1" | "2" | "3"} />

    return (
        <MainLayout data-testid="forum-page">
            <ContentContainer title={title}>
                {themes && mainThemeId && themes[mainThemeId] && themes[mainThemeId]
                    .map(({title, description, theme_id}) =>
                        <TopicCard
                            key={theme_id}
                            title={title}
                            messageCount={comments[theme_id]?.length}
                            description={description}
                            mainThemeId={mainThemeId}
                            themeId={theme_id}
                        />
                    )
                }
            </ContentContainer>
        </MainLayout>
    );
};

export default MainThemePage;
