import api from "./api"

import type {
    Show,
    ShowDetail
} from "@/types/show"

export const showService = {

    async getShows(): Promise<Show[]> {

        const response = await api.get("/shows/")

        return response.data

    },

    async getShow(id: number): Promise<ShowDetail> {

        const response = await api.get(`/shows/${id}/`)

        return response.data

    }

}