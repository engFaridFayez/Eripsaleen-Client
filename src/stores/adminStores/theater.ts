import { defineStore } from "pinia";
import type { Theater } from "@/types/theater";
import { AdminTheaterService } from "@/services/adminServices/theater.service";


export const useTheaterStore = defineStore("theater", {
    state: () => ({
        theaters: [] as Theater[],
        theater: null as Theater | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async getTheaters() {
            this.loading = true;
            this.error = null;

            try {
                const res = await AdminTheaterService.getAll();
                this.theaters = res.data;
            } catch (error) {
                this.error = "Error fetching theaters";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async getTheaterById(id:number){
            this.loading = true;
            this.error = null;

            try {
                const res = await AdminTheaterService.getById(id);
                this.theater = res.data;
            } catch (error) {
                this.error = "Error fetching theater";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async createTheater(data: Theater){
            this.loading = true;
            this.error = null;

            try {
                const res = await AdminTheaterService.create(data)
                this.theaters.push(res.data)
            } catch (error) {
                this.error = "Error creating theater";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async updateTheater(id:number,data:Theater){
            this.loading = true;
            this.error = null;

            try {
                const res = await AdminTheaterService.update(id,data)
                const index = this.theaters.findIndex(
                    theater => theater.id === id
                );

                if (index !== -1) {
                    this.theaters[index] = res.data;
                }

                this.theater = res.data
            } catch (error) {
                this.error = "Error updating theater";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async deleteTheater(id:number){
            this.loading = true;
            this.error = null;

            try {
                await AdminTheaterService.delete(id);
                this.theaters = this.theaters.filter(
                    theater => theater.id !== id
                )
                if(this.theater?.id === id){
                    this.theater = null
                }
            } catch (error) {
                
            }
        }
    }
})