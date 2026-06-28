<script setup lang="ts">
import { onMounted } from "vue"

import { useRoute } from "vue-router"

import { storeToRefs } from "pinia"

import { useShowStore } from "@/stores/show"

const route = useRoute()

const showStore = useShowStore()

const { selectedShow } =
storeToRefs(showStore)

onMounted(() => {

    showStore.fetchShow(
        Number(route.params.id)
    )

})
</script>

<template>

<div
v-if="selectedShow"
class="max-w-5xl mx-auto py-16"
>

<h1 class="text-4xl font-bold">

{{ selectedShow.title }}

</h1>

<p class="mt-5">

{{ selectedShow.description }}

</p>

<div
class="space-y-5 mt-10"
>

<div

v-for="event in selectedShow.events"

:key="event.id"

class="rounded-xl border p-5"

>

<h3>

{{ event.title }}

</h3>

<p>

{{ event.theater }}

</p>

<p>

{{ new Date(event.event_date).toLocaleString() }}

</p>

<router-link

:to="{

name:'booking-event',

params:{

eventId:event.id

}

}"

>

Book Now

</router-link>

</div>

</div>

</div>

</template>