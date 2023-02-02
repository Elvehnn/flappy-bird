import React from "react";
import { useNavigate } from "react-router-dom";

import "./TopicCard.scss";

interface MainTopicCardProps {
    title: string;
    messageCount?: number;
    description: string;
    mainThemeId: string;
    themeId: number;
}

const TopicCard = ({title, messageCount, description, mainThemeId, themeId}: MainTopicCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="topic-card">
            <div className="topic-card__info">
                <div onClick={() => navigate(`/forum/${mainThemeId}/${themeId}`)} className="topic-card__title">{title}</div>
                <div className="topic-card__description">{description}</div>
            </div>
            <div className="counter">
                <div className="counter__title">Сообщения</div>
                <div className="counter__number">{messageCount ? messageCount : "0"}</div>
            </div>
        </div>
    );
};

export default TopicCard;
