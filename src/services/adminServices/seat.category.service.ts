// services/adminServices/seatCategory.ts

import api from "@/services/api";

export default {
    getAll(theater?: number) {
        if (theater) {
            return api.get(`seat-categories/?theater=${theater}`);
        }

        return api.get("seat-categories/");
    },

    get(id: number) {
        return api.get(`seat-categories/${id}/`);
    },

    create(data: any) {
        return api.post("seat-categories/", data);
    },

    update(id: number, data: any) {
        return api.patch(`seat-categories/${id}/`, data);
    },

    delete(id: number) {
        return api.delete(`seat-categories/${id}/`);
    },
};