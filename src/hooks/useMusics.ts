import { MusicQuery } from "../App";
import useData from "./useData";

//받을 때
export interface Music {
  id: number;
  title: string;
  singer: string;
  songWriter: string;
  postWriter: string;
  tags: String[];
  likes: number;
  views: number;
  country: string;
  genre: string;
  videoId: string;
  posted: Date;
  released: Date;
}

const useMusics = (musicQuery: MusicQuery) =>
  useData<Music>(
    "/musics",
    {
      params: {
        country: musicQuery.country?.name,
        genre: musicQuery.genre?.name,
        tags: musicQuery.tags,
        ordering: musicQuery.sortOrder,
        search: musicQuery.searchText,
      },
    },
    [musicQuery]
  );

export default useMusics;
