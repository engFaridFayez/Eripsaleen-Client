import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  partialUpdateVideo,
  deleteVideo,
  getFrontendVideos,
  type FrontVideoFilters,
} from "@/services/media/video.service";
import type { Video } from "@/types/media";

export const useVideoStore = defineStore("video", () => {
  const videos = ref<Video[]>([]);
  const currentVideo = ref<Video | null>(null);

  const frontendVideos = ref<Video[]>([]);
  const frontendPodcasts = ref<Video[]>([]);
  const frontendReels = ref<Video[]>([]);

  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchVideos = async () => {
    loading.value = true;
    error.value = null;

    try {
      videos.value = await getVideos();
    } catch (err) {
      error.value = "Failed to fetch videos";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchVideo = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      currentVideo.value = await getVideo(id);
      return currentVideo.value;
    } catch (err) {
      error.value = "Failed to fetch video";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addVideo = async (payload: FormData) => {
    loading.value = true;
    error.value = null;

    try {
      const newVideo = await createVideo(payload);
      videos.value.push(newVideo);
      return newVideo;
    } catch (err) {
      error.value = "Failed to create video";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const editVideo = async (
    id: number,
    payload: FormData
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const updated = await updateVideo(id, payload);

      const index = videos.value.findIndex(
        (video) => video.id === id
      );

      if (index !== -1) {
        videos.value[index] = updated;
      }

      if (currentVideo.value?.id === id) {
        currentVideo.value = updated;
      }

      return updated;
    } catch (err) {
      error.value = "Failed to update video";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const patchVideo = async (
    id: number,
    payload: FormData
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const updated = await partialUpdateVideo(
        id,
        payload
      );

      const index = videos.value.findIndex(
        (video) => video.id === id
      );

      if (index !== -1) {
        videos.value[index] = updated;
      }

      if (currentVideo.value?.id === id) {
        currentVideo.value = updated;
      }

      return updated;
    } catch (err) {
      error.value = "Failed to update video";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeVideo = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      await deleteVideo(id);

      videos.value = videos.value.filter(
        (video) => video.id !== id
      );

      if (currentVideo.value?.id === id) {
        currentVideo.value = null;
      }
    } catch (err) {
      error.value = "Failed to delete video";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchFrontendVideos = async (
    filters?: FrontVideoFilters
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await getFrontendVideos(filters);

      switch (filters?.content_type) {
        case "video":
          frontendVideos.value = data;
          break;

        case "podcast":
          frontendPodcasts.value = data;
          break;

        case "reel":
          frontendReels.value = data;
          break;

        default:
          frontendVideos.value = data;
          frontendPodcasts.value = [];
          frontendReels.value = [];
      }
    } catch (err) {
      error.value = "Failed to fetch frontend videos";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    videos,
    currentVideo,

    frontendVideos,
    frontendPodcasts,
    frontendReels,

    loading,
    error,

    fetchVideos,
    fetchVideo,
    addVideo,
    editVideo,
    patchVideo,
    removeVideo,

    fetchFrontendVideos,
  };
});