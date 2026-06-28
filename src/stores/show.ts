import { defineStore } from "pinia"
import { ref } from "vue"

import { showService } from "@/services/show.service"

import type {
    Show,
    ShowDetail
} from "@/types/show"

export const useShowStore = defineStore("show", () => {

    const shows = ref<Show[]>([])

    const selectedShow = ref<ShowDetail | null>(null)

    const loading = ref(false)

    async function fetchShows() {

        loading.value = true

        try {

            shows.value = await showService.getShows()

        }

        finally {

            loading.value = false

        }

    }

    async function fetchShow(showId: number) {

        loading.value = true

        try {

            selectedShow.value =
                await showService.getShow(showId)

        }

        finally {

            loading.value = false

        }

    }

    function clearSelectedShow() {

        selectedShow.value = null

    }

    return {

        loading,

        shows,

        selectedShow,

        fetchShows,

        fetchShow,

        clearSelectedShow

    }

})