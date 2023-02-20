import { Layout, Row, Typography, Card, Button } from "antd";
import "./Team.scss";
import { useAppSelector } from "@/store/hooks";
import { themeSelectors } from "@/store/slices/theme/themeSlice";
import { team } from "@/constants/team";
import { NavLink, useNavigate } from "react-router-dom";

const Team = () => {
    const { theme } = useAppSelector(themeSelectors.all);
    const navigate = useNavigate();

    const onClick = () => {
        navigate(-1);
    };

    return (
        <Layout
            className="layout"
            data-testid="team-page"
            style={{
                backgroundImage: theme.images.backgroundLong,
                alignItems: "center",
                paddingBottom: 150,
            }}>
            <Row style={{ justifyContent: "center", paddingBottom: 40 }}>
                <div className="logo">
                    <Typography.Title
                        level={2}
                        data-testid="logo-underline"
                        style={{
                            color: theme.design.token.colorTextSecondary,
                        }}>
                        Pachka-i-tocka
                    </Typography.Title>
                </div>
            </Row>

            <div className="cards-container">
                {team.map(teamMate => {
                    return (
                        <div key={teamMate.id}>
                            <Card
                                style={{ width: 140 }}
                                cover={
                                    <img
                                        alt="example"
                                        src={teamMate.avatarLink}
                                    />
                                }>
                                <h3>{teamMate.name}</h3>
                                <NavLink
                                    to={teamMate.gitHubLink}
                                    target="_blank">
                                    Гитхаб автора
                                </NavLink>
                            </Card>
                        </div>
                    );
                })}
            </div>

            <Button onClick={onClick} style={{ width: 80 }}>
                НАЗАД
            </Button>
        </Layout>
    );
};

export default Team;
