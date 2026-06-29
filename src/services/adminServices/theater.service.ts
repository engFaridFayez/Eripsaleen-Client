import api from "@/services/api"
import type { Theater } from "@/types/theater"
export const AdminTheaterService = {
    async getAll() {
        return await api.get('admin/theaters/')
    },
    async getById(id:number) {
        return await api.get(`admin/theaters/${id}/`)
    },
    async create(data:Theater) {
        return await api.post("admin/theaters/",data)
    },
    async update(id:number,data:Theater){
        return await api.put(`admin/theaters/${id}/`,data)
    },
    async delete(id:number) {
        return await api.delete(`admin/theaters/${id}/`)
    }
}