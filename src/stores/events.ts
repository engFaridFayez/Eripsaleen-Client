import { defineStore } from "pinia"
import { ref } from "vue"

import type {
    Event,
    SeatMapResponse
} from "@/types/events"

import { eventService } from "@/services/event.service"

export const useEventStore = defineStore("event", () => {

    const events = ref<Event[]>([])

    const seatMap = ref<SeatMapResponse | null>(
        null
    )

    const loading = ref(false)

    const selectedEventId = ref<number | null>(
        null
    )

    async function fetchEvents() {

        loading.value = true

        try {

            events.value =
                await eventService.getEvents()

        }

        finally {

            loading.value = false

        }
    }

    async function fetchEvent(
        eventId: number
    ) {
        loading.value = true

        try {
            events.value = [
                await eventService.getEvent(eventId)
                
            ]
            
        }

        finally {
            loading.value = false
        }
    }

    async function fetchSeatMap(
        eventId: number
    ) {

        loading.value = true

        try {

            seatMap.value =
                await eventService.getSeatMap(
                    eventId
                )

            selectedEventId.value = eventId

        }

        finally {

            loading.value = false

        }
    }

    return {
        events,
        seatMap,
        loading,
        selectedEventId,
        fetchEvents,
        fetchSeatMap,
        fetchEvent
    }
})