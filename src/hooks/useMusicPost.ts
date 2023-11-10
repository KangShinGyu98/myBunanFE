import useData from "./useData";
import { Music } from "./useMusics";

const useMusicPost = (id: number) =>
  useData<Music>(
    `/music/${id}`,
    {
      params: {},
    },
    []
  );

export default useMusicPost;
