import MainLayout from "@/containers/MainLayout/MainLayout";
import ContentContainer from "@/containers/ContentContainer/ContentContainer";
import MainTopicCard from "@/pages/ForumPage/components/MainTopicCard/MainTopicCard";

const ForumPage = () => {
    return (
        <MainLayout data-testid="forum-page">
            <ContentContainer title="Форум">
                <>
                    <MainTopicCard title="НОВОСТИ" messageCount={23} themesCount={100} />
                    <MainTopicCard title="ПРЕДЛОЖЕНИЯ ПО УЛУЧШЕНИЮ" messageCount={23} themesCount={100} />
                    <MainTopicCard title="ТЕХНИЧЕСКАЯ ПОДДЕРЖКА" messageCount={23} themesCount={100} />
                </>
            </ContentContainer>
        </MainLayout>
    );
};

export default ForumPage;
