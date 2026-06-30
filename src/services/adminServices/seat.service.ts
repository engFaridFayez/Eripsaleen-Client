// services/adminServices/seat.ts

import api from "@/services/api";
import type { AdminSeat } from "@/types/events";
export default {

    getAll(){
        return api.get<AdminSeat[]>("/seats/");
    },

    getById(id:number){
        return api.get<AdminSeat>(`/seats/${id}/`);
    },

    create(data:{
        row:number;
        seat_number:string;
    }){
        return api.post("/seats/",data);
    },

    update(id:number,data:{
        row:number;
        seat_number:string;
    }){
        return api.put(`/seats/${id}/`,data);
    },

    delete(id:number){
        return api.delete(`/seats/${id}/`);
    }

}