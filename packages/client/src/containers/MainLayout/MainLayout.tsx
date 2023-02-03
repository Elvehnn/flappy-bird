import { FunctionComponent, ReactElement } from "react";
import { Layout, Row, Col, Button } from "antd";
import "./MainLayout.sass";
import { NavigationMenu } from "@/components/navigation/Navigation";
import { NavLink } from "react-router-dom";
import "./MainPage.scss";
import { useAppSelector } from "@/store/hooks";
import { userSelectors } from "@/store/slices/user/userSlice";
import Title from "antd/lib/typography/Title";
import { COLORED_LOGO } from "@/constants/imagesPaths";

const { Content, Footer, Header } = Layout;

type MainLayoutProps = {
    children: ReactElement;
};

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
    const { user } = useAppSelector(userSelectors.all);

    return (
        <Layout className="layout">
            <Header className="layout_header">
                <img
                    width={300}
                    className="layout_header_img"
                    src={COLORED_LOGO}
                    data-testid="logo"
                />
            </Header>

            <Content className="layout_content">
                <Row gutter={150} justify="center">
                    <Col
                        span={7}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}>
                        <h2>Привет, {user ? user.login : "Юзер"}!</h2>

                        {user ? (
                            <Title level={3}>Твой лучший результат: 777</Title>
                        ) : null}

                        <NavigationMenu />

                        <NavLink to={"/game"}>
                            <Button
                                htmlType="button"
                                type="primary"
                                className="layout_content-start">
                                СТАРТ
                            </Button>
                        </NavLink>
                    </Col>

                    <Col span={15} className="layout_content-child">
                        {children}
                    </Col>
                </Row>
            </Content>

            <Footer className="layout_footer">By Пачка и Точка</Footer>
        </Layout>
    );
};

export default MainLayout;
