import { useEffect, useState } from "react";
import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import CountrySelector from "../components/CountrySelector";
import GenreSelector from "../components/GenreSelector";
import useGenres, { Genre } from "../hooks/useGenres";
import useCountries, { Country } from "../hooks/useCountries";
import NewPost from "../components/NewPost";
import UpdatePost from "../components/UpdatePost";
import { useParams } from "react-router-dom";
import axios from "axios";

export interface NewMusicQuery {
  title: string;
  singer: string;
  songWriter: string;
  postWriter: string;
  lyricWriter: string;
  remixArtist: string;
  released: Date;
  videoId: string;
  country: Country | null;
  genre: Genre | null;
  tags: string[];
  lyric: string;
  lyricComment: string;
}

const UpdateMusicPost = () => {
  const [musicQuery, setMusicQuery] = useState<NewMusicQuery>({} as NewMusicQuery);
  const { id } = useParams(); // URL 파라미터에서 id를 가져옵니다.
  const toast = useToast();
  // console.log("id", id);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const countries = useCountries().data;
  const genres = useGenres().data;
  useEffect(() => {
    const getMusicPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/update/${id}`);
        response.data.released = new Date(response.data.released);
        response.data.videoId = "https://www.youtube.com/watch?v=" + response.data.videoId;

        response.data.country = countries.find((country) => country.name === response.data.country);
        response.data.genre = genres.find((genre) => genre.name === response.data.genre);

        setMusicQuery(response.data); // 응답 데이터 설정
        console.log("response", response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching music post:", error);
        setIsLoading(false);
      }
    };
    getMusicPost();
  }, [id]); // id가 변경될 때 요청 다시 보냄
  // useEffect(() => {
  //   // console.log("musicQuery", musicQuery);
  // }, [musicQuery]); // musicQuery가 변경될 때마다 실행
  return isLoading ? (
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  ) : (
    <>
      <Box paddingLeft={2}>
        <Flex mb={5} ml={10} mt={10}>
          <Box mr={5}>
            <CountrySelector
              selectedCountry={musicQuery.country}
              onSelectCountry={(country) => {
                setMusicQuery({ ...musicQuery, country });
              }}
            />
          </Box>
          <Box marginRight={5}>
            <GenreSelector selectedGenre={musicQuery.genre} onSelectGenre={(genre) => setMusicQuery({ ...musicQuery, genre })} />
          </Box>
        </Flex>
      </Box>
      <UpdatePost musicQuery={musicQuery} setMusicQuery={setMusicQuery} id={id} />
    </>
  );
};

export default UpdateMusicPost;
