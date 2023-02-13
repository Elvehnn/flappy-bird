import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input } from "antd";

import MainLayout from "@/containers/MainLayout/MainLayout";
import ContentContainer from "@/containers/ContentContainer/ContentContainer";
import Comment from "@/pages/ForumPage/components/Comment/Comment";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { addNewComment, getThemeComments } from "@/services/forum";
import { forumActions, forumSelector } from "@/store/slices/forum/forumSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userSelectors } from "@/store/slices/user/userSlice";
import { ForumComment } from "@/api/typesApi";

import "./ThemePage.scss";

const ThemePage = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState("")

    const { mainThemeId, themeId } = params;

    const comments = useAppSelector(forumSelector.comments);
    const { user } = useAppSelector(userSelectors.all);

    const fetchCommentsAll = async () => {
        if (!themeId) return

        const comments = await getThemeComments(Number(themeId));
        if (comments) {
            comments.forEach((comment: ForumComment) => comment.created = new Date(comment.created).toLocaleString())
            dispatch(forumActions.setComments({ comments, themeId: Number(themeId) }));
        }
    };

    const addComment = async () => {
        if (!themeId || !user || !value) return

        addNewComment(themeId, value, user.id).then(() => {
            setValue("")
            fetchCommentsAll()
        });
    }

    useEffect(() => {
        fetchCommentsAll();
    }, []);

    const title =
        <div className="forum-card__head">
            <Button onClick={() => navigate(`/forum/${mainThemeId}`)} size="large" type="primary" shape="circle"
                    icon={<ArrowLeftOutlined />} />
            <span className="forum-card__title">Форум</span>
        </div>;

    return (
        <MainLayout data-testid="forum-page">
            <ContentContainer style={{ paddingBottom: "40px" }} title={title}>
                {themeId && comments[themeId] && comments[themeId]?.map(({created, body, comment_id, created_by}) =>
                    <Comment
                        key={comment_id}
                        created={created}
                        body={body}
                        createdBy={created_by}
                    />
                )}
                <div className="send-comment">
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        size="large"
                        placeholder="Введите текст сообщения"
                        className="send-comment__input"
                    ></Input>
                    <Button
                        size="large"
                        className="send-comment__button"
                        type="primary"
                        htmlType="submit"
                        onClick={addComment}
                    >
                        Отправить
                    </Button>
                </div>
            </ContentContainer>
        </MainLayout>
    );
};

export default ThemePage;
