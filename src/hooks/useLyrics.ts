import useData from "./useData";

export interface Lyric {
  id: number;
  content: string;
  orderNumber: number;
  lyricComments: LyricComment[];
}
export interface LyricComment {
  id: number;
  content: string;
  likes: number;
  likey: boolean;
  dislikes: number;
  reports: number;
  writer: string;
  created: Date;
  modified: Date;
  deleted: Date;
}

const useLyrics = (id: number, nickname: string) =>
  useData<Lyric>(
    `/lyric/${id}`,
    {
      params: {
        nickname: nickname,
      },
    },
    []
  );

export default useLyrics;
