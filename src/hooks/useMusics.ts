import { GameQuery, MusicQuery } from "../App";
import useData from "./useData";

export interface Music {
  id: number;
  name: string;
  singer: string;
  tags: String[];
  likes: number;
  views: number;
  country: string;
  genre: string;
  videoId: string;
}

const useMusics = (musicQuery: MusicQuery) =>
  useData<Music>(
    "/musics",
    {
      params: {
        countryId: musicQuery.country?.id,
        genreId: musicQuery.genre?.id,
        tags: musicQuery.tags,
        ordering: musicQuery.sortOrder,
        search: musicQuery.searchText,
      },
    },
    [musicQuery]
  );

export default useMusics;
