import React, { MouseEventHandler, useState } from "react";
import { Button, Form, Input } from "antd";
import classNames from "classnames";

import "./MainTopicCard.scss";
import { addNewTheme, getThemes } from "@/services/forum";
import { forumActions } from "@/store/slices/forum/forumSlice";
import { useAppDispatch } from "@/store/hooks";

interface MainTopicCardProps {
    title: string;
    themesCount: number;
    openTheme: MouseEventHandler<HTMLDivElement>;
    mainThemeId: number;
}

interface FormValues {
    title: string;
    description: string;
}

const MainTopicCard = ({title, themesCount, openTheme, mainThemeId}: MainTopicCardProps) => {
    const [isVisibleCreateTopic, setIsVisibleCreateTopic] = useState(false);
    const dispatch = useAppDispatch();

    const createTopicClasses = classNames("create-topic", {
        ["create-topic_open"]: isVisibleCreateTopic,
    })

    const onFinish = async ({ title, description }: FormValues) => {
        try {
            await addNewTheme(mainThemeId, title, description);
            setIsVisibleCreateTopic(false);
            getThemes().then(themes => dispatch(forumActions.setThemes(themes)));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="main-topic-card">
            <div className="main-topic">
                <div className="main-topic__name" onClick={openTheme}>{title}</div>
                <div className="main-topic__info">
                    <div className="counter">
                        <div className="counter__title">Темы</div>
                        <div className="counter__number">{themesCount}</div>
                    </div>
                    <Button className="main-topic__button" danger={isVisibleCreateTopic} onClick={() => setIsVisibleCreateTopic(prev => !prev)}>
                        {isVisibleCreateTopic ? "Отменить" : "Создать тему"}
                    </Button>
                </div>
            </div>
            <div className={createTopicClasses}>
                <Form className="create-topic__input-group" onFinish={onFinish}>
                    <div className="create-topic__inputs">
                        <label className="create-topic__label">Название</label>
                        <Form.Item
                            className="create-topic__form-item"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Название темы не может быть пустым",
                                },
                            ]}
                        >
                            <Input id="title" placeholder="Введите название темы" />
                        </Form.Item>
                        <label className="create-topic__label">Описание</label>
                        <Form.Item
                            className="create-topic__form-item"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Описание не может быть пустым",
                                },
                            ]}
                        >
                            <Input id="description" placeholder="Введите описание темы" />
                        </Form.Item>
                    </div>
                    <Button className="create-topic__button" type="primary" htmlType="submit">Создать</Button>
                </Form>
            </div>
        </div>
    );
};

export default MainTopicCard;
