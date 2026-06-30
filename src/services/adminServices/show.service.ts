import api from "@/services/api"
import type { Show, ShowDetail } from "@/types/show"


export const AdminShowService = {
    getAll(){
        return api.get<Show[]>("shows/")
    },

    getById(id:number) {
        return api.get<ShowDetail>(`shows/${id}/`)
    },

    create(data: FormData){
        return api.post("shows/",data)
    },

    update(id:number,data:FormData){
        return api.patch(`shows/${id}/`,data)
    },

    delete(id:number){
        return api.delete(`shows/${id}/`)
    }
}