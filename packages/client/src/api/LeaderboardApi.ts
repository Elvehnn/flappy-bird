import { ResponseStatus } from "@/api/typesApi";
import { AxiosError } from "axios";
import axios from "./axiosSetup";
import { ENDPOINTS } from "@/constants/apiPaths";

export const getLadder = async () =>
    await axios.get(`http://localhost:5000/${ENDPOINTS.LADDER}`);

export const addLadder = async (
    ladder_id: number,
    user_name: string,
    count: number
): Promise<ResponseStatus | AxiosError> =>
    await axios.post(`http://localhost:5000/${ENDPOINTS.LADDER}`, {
        ladder_id,
        user_name,
        count,
        created: new Date(),
    });

export const getUserScoreInfo = async (id: number) =>
    await axios.get(`http://localhost:5000/${ENDPOINTS.LADDER}/${id}`);
