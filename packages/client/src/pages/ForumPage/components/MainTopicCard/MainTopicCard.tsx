import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import classNames from "classnames";

import "./MainTopicCard.scss";

interface MainTopicCardProps {
    title: string;
    messageCount: number;
    themesCount: number;
}

const MainTopicCard = ({title, messageCount, themesCount}: MainTopicCardProps) => {
    const [isVisibleCreateTopic, setIsVisibleCreateTopic] = useState(false);

    const createTopicClasses = classNames("create-topic", {
        ["create-topic_open"]: isVisibleCreateTopic,
    })

    const onFinish = (values) => {
        console.log(values)
    }

    return (
        <div className="root">
            <div className="topic">
                <div className="topic__name">{title}</div>
                <div className="topic__info">
                    <div className="counter">
                        <div className="counter__title">Темы</div>
                        <div className="counter__number">{themesCount}</div>
                    </div>
                    <div className="counter">
                        <div className="counter__title">Сообщения</div>
                        <div className="counter__number">{messageCount}</div>
                    </div>
                    <Button className="topic__button" danger={isVisibleCreateTopic} onClick={() => setIsVisibleCreateTopic(prev => !prev)}>
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
