import { Layout, Row, Image } from "antd";
import {
    COLORED_LOGO,
    LOADING_TITLE,
    PRESENTATION_IMAGE_DARK,
} from "@/constants/imagesPaths";
const { Footer } = Layout;

const Preloader = () => {
    return (
        <Layout
            className="layout"
            data-testid="loader-page"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundImage: `url(${PRESENTATION_IMAGE_DARK})`,
                backgroundSize: "cover",
            }}>
            <Row
                style={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Image width={100} src={COLORED_LOGO} data-testid="logo" />
                <Image
                    width={350}
                    src={LOADING_TITLE}
                    data-testid="loader-title"
                />
            </Row>

            <Footer className="layout_footer">By Пачка и Точка</Footer>
        </Layout>
    );
};

export default Preloader;
