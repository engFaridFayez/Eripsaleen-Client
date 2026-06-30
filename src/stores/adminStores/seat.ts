// services/adminServices/seat.ts

import api from "@/services/api";

export default {

    getAll(){
        return api.get("/seats/");
    },

    getById(id:number){
        return api.get(`/seats/${id}/`);
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