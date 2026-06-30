// services/adminServices/row.ts

import api from "@/services/api";
import type { AdminRow } from "@/types/events";
export default {

    getAll() {
        return api.get<AdminRow[]>("/rows/");
    },

    getById(id:number) {
        return api.get<AdminRow>(`/rows/${id}/`);
    },

    create(data:{
        section:number;
        row_number:number;
        seats_per_row:number;
    }) {
        return api.post("/rows/", data);
    },

    update(id:number,data:{
        section:number;
        row_number:number;
        seats_per_row:number;
    }) {
        return api.put(`/rows/${id}/`,data);
    },

    delete(id:number){
        return api.delete(`/rows/${id}/`);
    }

}