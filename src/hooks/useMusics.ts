import { GameQuery, MusicQuery } from "../App";
import useData from "./useData";

export interface Tag {
  id: number;
  name: string;
}

export interface Music {
  id: number;
  name: string;
  background_image: string;
  tags: Tag[];
  metacritic: number;
  rating_top: number;
  country: string;
}

const useMusics = (musicQuery: MusicQuery) =>
  useData<Music>(
    "/musics",
    {
      params: {
        genres: musicQuery.genre?.id,
        tags: musicQuery.tag?.id,
        ordering: musicQuery.sortOrder,
        search: musicQuery.searchText
      },
    },
    [musicQuery]
  );

export default useMusics;
