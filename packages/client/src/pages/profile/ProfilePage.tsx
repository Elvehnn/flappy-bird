import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Row,
    Statistic,
    Typography,
} from "antd";
import "./ProfilePage.scss";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userSelectors } from "@/store/slices/user/userSlice";
import { useAppSelector } from "@/store/hooks";
import { PATH } from "@/constants/apiPaths";
import MainLayout from "@/containers/MainLayout/MainLayout";
import { leaderboardSelector } from "@/store/slices/leaderboard/leaderBoardSlice";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector(userSelectors.all);
    const { userScoreInfo } = useAppSelector(leaderboardSelector.leaders);

    return (
        <MainLayout>
            <Card
                style={{
                    width: 500,
                    height: 295,
                }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    {user?.avatar ? (
                        <Avatar
                            size={64}
                            icon={<UserOutlined />}
                            src={`${PATH.BASE}${PATH.RESOURCES}/${user.avatar}`}
                        />
                    ) : (
                        <Avatar size={64} icon={<UserOutlined />} />
                    )}

                    <Typography.Title level={3}>{user?.login}</Typography.Title>
                    <Typography>{user?.email}</Typography>
                    <Row>
                        <Col>
                            <Statistic
                                title="Best Score"
                                value={userScoreInfo?.count}
                                style={{
                                    marginTop: 10,
                                    marginRight: "3rem",
                                }}
                            />
                        </Col>
                    </Row>

                    <Divider />
                    <Row>
                        <Col span={12}>
                            <Button
                                type="default"
                                onClick={() => navigate("/profile-change")}>
                                Edit Profile
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </MainLayout>
    );
};
