import { UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { Character } from "../../../server/db/schema";



export const characters = (searchParams: URLSearchParams): UseQueryOptions<{ data: Character[], page: number, pageCount: number }> => {
    const params = {
        name: searchParams.get("name"),
        page: searchParams.get("page")
    };

    return {
        queryKey: ["characters", params] as const,
        async queryFn({ signal }) {
            const { data } = await axios.get(`/characters`, { params, signal });

            return data;
        }
    };
};