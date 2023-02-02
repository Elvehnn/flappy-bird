import React from "react";
import { Button } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { MAIN_THEMES } from "@/pages/ForumPage/pages/MainThemePage/constants";
import { useNavigate } from "react-router-dom";

import "./ForumCardHead.scss";

interface ForumCardHeadProps {
    link: string;
    mainThemeId: "1" | "2" | "3";
}

const ForumCardHead = ({link, mainThemeId}: ForumCardHeadProps) => {
    const navigate = useNavigate();

    return (
        <div className="forum-card__head">
            <Button onClick={() => navigate(link)} size="large" type="primary" shape="circle" icon={<ArrowLeftOutlined />} />
            <span className="forum-card__title">{MAIN_THEMES[mainThemeId]}</span>
        </div>
    );
};

export default ForumCardHead;
