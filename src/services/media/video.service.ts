import api from "@/services/api";
import type {
  Video,
  VideoContentType,
} from "@/types/media";

export const getVideos = async (): Promise<Video[]> => {
  const { data } = await api.get("/videos/");
  return data;
};

export const getVideo = async (
  id: number
): Promise<Video> => {
  const { data } = await api.get(`/videos/${id}/`);
  return data;
};

export const createVideo = async (
  video: FormData
): Promise<Video> => {
  const { data } = await api.post("/videos/", video);
  return data;
};

export const updateVideo = async (
  id: number,
  video: FormData
): Promise<Video> => {
  const { data } = await api.put(
    `/videos/${id}/`,
    video
  );

  return data;
};

export const partialUpdateVideo = async (
  id: number,
  video: FormData
): Promise<Video> => {
  const { data } = await api.patch(
    `/videos/${id}/`,
    video
  );

  return data;
};

export const deleteVideo = async (
  id: number
): Promise<void> => {
  await api.delete(`/videos/${id}/`);
};

export interface FrontVideoFilters {
  sub_category?: number;
  content_type?: VideoContentType;
}

export const getFrontendVideos = async (
  filters?: FrontVideoFilters
): Promise<Video[]> => {
  const { data } = await api.get(
    "/frontend/videos/",
    {
      params: filters,
    }
  );

  return data;
};