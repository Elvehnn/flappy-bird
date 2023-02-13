import React from "react";

import "./Comment.scss";

interface CommentCardProps {
    created: string;
    body: string;
    createdBy: string;
}

const Comment = ({created, body, createdBy}: CommentCardProps) => {
    return (
        <div className="comment-card">
            <div className="comment-card__info">
                <div className="comment-card__title">{createdBy}</div>
                <div className="comment-card__description">{body}</div>
            </div>
            <div className="comment-card__date">{created}</div>
        </div>
    );
};

export default Comment;
