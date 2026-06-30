// services/adminServices/section.ts

import api from "@/services/api";
import type { AdminSection } from "@/types/events";

export default {
    getAll() {
        return api.get<AdminSection[]>("/sections/");
    },

    getById(id: number) {
        return api.get<AdminSection>(`/sections/${id}/`);
    },

    create(data: {
        theater: number;
        name: string;
    }) {
        return api.post("/sections/", data);
    },

    update(id: number, data: {
        theater: number;
        name: string;
    }) {
        return api.put(`/sections/${id}/`, data);
    },

    delete(id: number) {
        return api.delete(`/sections/${id}/`);
    }
}