import MainLayout from "@/containers/MainLayout/MainLayout";
import { Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import ContentContainer from "@/containers/ContentContainer/ContentContainer";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    leaderboardActions,
    leaderboardSelector,
} from "@/store/slices/leaderboard/leaderBoardSlice";
import { LadderScore } from "@/api/typesApi";
import { formattedDate } from "@/utils/formattedDate";

interface DataType extends LadderScore {
    key: number;
}

const LadderPage = () => {
    const dispatch = useAppDispatch();

    const columns: ColumnsType<Omit<DataType, "ladder_id">> = useMemo(
        () => [
            { title: "Рейтинг", dataIndex: "key", key: "key" },
            {
                title: "Логин пользователя",
                dataIndex: "user_name",
                key: "user_name",
            },
            {
                title: "Дата",
                dataIndex: "created",
                key: "created",
            },
            {
                title: "Колличество баллов",
                dataIndex: "count",
                key: "count",
            },
        ],
        []
    );

    useEffect(() => {
        dispatch(leaderboardActions.get());
    }, []);

    const { data, fetching } = useAppSelector(leaderboardSelector.leaders);

    const formattedData = useMemo(
        () =>
            (data || []).map((user, index) => {
                const { count, created, user_name } = user;

                return {
                    key: index + 1,
                    user_name,
                    created: created ? formattedDate(new Date(created)) : "",
                    count,
                };
            }),
        [data]
    );

    if (!data)
        return (
            <MainLayout data-testid="leader-board">
                <ContentContainer title="Доска лидеров">
                    Данные не найдены
                </ContentContainer>
            </MainLayout>
        );

    return (
        <MainLayout data-testid="leader-board">
            <ContentContainer title="Доска лидеров">
                {fetching ? (
                    <Spin />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={formattedData}
                        pagination={false}
                    />
                )}
            </ContentContainer>
        </MainLayout>
    );
};

export default LadderPage;
