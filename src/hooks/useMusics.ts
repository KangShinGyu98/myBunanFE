import { GameQuery, MusicQuery } from "../App";
import useData from "./useData";

export interface Music {
  id: number;
  name: string;
  singer: string;
  background_image: string;
  tags: String[];
  likes: number;
  country: string;
  genre: string;
}

const useMusics = (musicQuery: MusicQuery) =>
  useData<Music>(
    "/musics",
    {
      params: {
        country: musicQuery.country?.id,
        genres: musicQuery.genre?.id,
        tags: musicQuery.tags,
        ordering: musicQuery.sortOrder,
        search: musicQuery.searchText,
      },
    },
    [musicQuery]
  );

export default useMusics;
