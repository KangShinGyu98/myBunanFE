import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import MusicHeading from "../components/MusicHeading";
import CountrySelector from "../components/CountrySelector";
import SortSelector from "../components/SortSelector";
import MusicGrid from "../components/MusicGrid";
import GenreSelector from "../components/GenreSelector";
import { Link } from "react-router-dom";
import { MusicQuery } from "./MainPage";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export interface MainMusicListProps {
  musicQuery: MusicQuery;
  setMusicQuery: (musicQuery: MusicQuery) => void;
}

const MainMusicList = ({ musicQuery, setMusicQuery }: MainMusicListProps) => {
  const toast = useToast();
  // const history = useHistory();
  const { user, isInitializing, onAuthStateChange } = useAuthContext();
  const moveToNewPost = () => {
    if (!user && !isInitializing) {
      toast({
        position: "top",
        title: "로그인 후 이용해주세요.",
        description: "상단의 로그인 버튼을 눌러주세요.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    // history.push("/create");
    // 여기에 원하는 작업을 추가할 수 있습니다.
  };

  return (
    <>
      <Box paddingLeft={2}>
        <MusicHeading musicQuery={musicQuery} />
        <Flex marginBottom={5}>
          <Box marginRight={5}>
            <CountrySelector selectedCountry={musicQuery.country} onSelectCountry={(country) => setMusicQuery({ ...musicQuery, country })} />
          </Box>
          <Box marginRight={5}>
            <GenreSelector selectedGenre={musicQuery.genre} onSelectGenre={(genre) => setMusicQuery({ ...musicQuery, genre })} />
          </Box>
          <SortSelector sortOrder={musicQuery.sortOrder} onSelectSortOrder={(sortOrder) => setMusicQuery({ ...musicQuery, sortOrder })} />
          {user || isInitializing ? (
            <Link to="/create">
              <Button colorScheme="whatsapp" marginLeft={5} variant="solid">
                새 글 작성
              </Button>
            </Link>
          ) : (
            <Button onClick={moveToNewPost} colorScheme="whatsapp" marginLeft={5} variant="solid">
              새 글 작성
            </Button>
          )}
        </Flex>
      </Box>
      <MusicGrid musicQuery={musicQuery} />
    </>
  );
};

export default MainMusicList;
function toast(arg0: { position: string; title: string; description: string; status: string; duration: number; isClosable: boolean }) {
  throw new Error("Function not implemented.");
}
