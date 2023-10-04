import useData from "./useData";

const useVideoId = (id: number) =>
  useData<string>(
    `/videoId/${id}`,
    {
      params: {},
    },
    []
  );

export default useVideoId;
