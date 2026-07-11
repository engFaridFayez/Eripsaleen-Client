import { AuthService } from "@/services/auth.service";
import type { User } from "@/types/auth";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null as User | null,
        username: null,
        selectedUser: null,
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh"),
        users: [],
        loading: false,
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => {
            return !!state.access;
        },
    },

    actions: {
        async initializeAuth() {
            if (this.access) {
                try {
                    await this.fetchUser();
                } catch (error) {
                    this.logout();
                }
            }
        },

        async fetchUser() {
            this.loading = true;
            try {
                const response = await AuthService.me();
                this.user = response.data;
            } catch (error: any) {
                console.error("Fetch user failed", error)

                if (error.response?.status === 401) {
                    window.dispatchEvent(new Event("unauthorized"))
                }
            } finally {
                this.loading = false;
            }
        },
        async logout() {
            this.user = null;
            this.access = null;
            this.refresh = null;
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        },

        async login(username: string, password: string) {
            try {
                const response = await AuthService.login(username, password);
                this.access = response.data.access;
                this.refresh = response.data.refresh;

                localStorage.setItem("access", this.access!);
                localStorage.setItem("refresh", this.refresh!);

                await this.fetchUser();
            } catch (error) {
                console.error("Login failed", error);
                throw error;
            }
        },
    }

});