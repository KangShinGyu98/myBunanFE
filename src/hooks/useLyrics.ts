import useData from "./useData";

export interface Lyric {
  id: number;
}

const useLyrics = (id: number) => useData<Lyric>(`/musics/${id}`, {}, []);

export default useLyrics;
