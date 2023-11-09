import {
  Box,
  Button,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { NewMusicQuery } from "../pages/CreateNewMusic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export interface NewPostProps {
  musicQuery: NewMusicQuery;
  setMusicQuery: (arg: ((prevMusicQuery: NewMusicQuery) => NewMusicQuery) | NewMusicQuery) => void;
}

const NewPost = ({ musicQuery, setMusicQuery }: NewPostProps) => {
  const toast = useToast();
  const { user, isInitializing, onAuthStateChange } = useAuthContext();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMusicQuery({
      ...musicQuery,
      [name]: value,
    });
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMusicQuery({
      ...musicQuery,
      [name]: value,
    });
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    try {
      if (musicQuery.country == null || musicQuery.genre == null) {
        toast({
          position: "top",
          title: "국가와 장르를 선택해주세요.",
          description: "제목 위에 있습니다.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      const response = await axios.post("http://localhost:8080/createNewMusic", {
        ...musicQuery,
        genre: musicQuery.genre?.name,
        country: musicQuery.country?.name,
        lyric: musicQuery.lyric.split("\n\n"),
        lyricComment: musicQuery.lyricComment.split("\n\n"),
        videoId: musicQuery.videoId.split("=")[1],
        postWriter: user?.nickname,
      });
      // 성공적으로 요청을 보냈을 때의 처리
      console.log("요청이 성공했습니다.");
      navigate("/");
    } catch (error) {
      // 요청 실패 시의 처리
      console.error("요청이 실패했습니다.", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack pl={10}>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftAddon children="제목 *" width={20} />
              <Input maxWidth={300} isRequired onChange={handleChange} name="title" placeholder="ex : 이메진 (IMAGINE) " />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftAddon children="가수 *" width={20} />
              <Input maxWidth={300} onChange={handleChange} name="singer" placeholder="ex : 존 레논 (John Lennon) " />
            </InputGroup>
          </FormControl>
          <InputGroup>
            <InputLeftAddon children="작사" width={20} />
            <Input maxWidth={310} onChange={handleChange} name="lyricWriter" placeholder="ex : 미상 " />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="작곡" width={20} />
            <Input maxWidth={310} onChange={handleChange} name="songWriter" placeholder="ex : 미상 " />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="편곡" width={20} />
            <Input maxWidth={310} onChange={handleChange} name="arrangement" placeholder="ex : 미상 " />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="발매일(Released Date)" />
            <Input
              maxWidth={300}
              onChange={handleChange}
              type="date"
              name="releasedDate"
              placeholder="ex : https://www.youtube.com/watch?v=YkgkThdzX-8"
            />
          </InputGroup>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftAddon children="Youtube 주소 *" />
              <Input maxWidth={500} onChange={handleChange} name="videoId" placeholder="ex : https://www.youtube.com/watch?v=YkgkThdzX-8" />
            </InputGroup>
          </FormControl>
          <Grid
            templateAreas={{
              base: `"ori" "adp"`, // original adaptation
              lg: `"ori adp" "ori adp"`,
            }}
            templateColumns={{
              base: "1fr",
              lg: "1fr 1fr",
            }}
            pr={{
              lg: "150",
            }}
            gap={4}
          >
            <GridItem area="ori">
              <FormControl isRequired>
                {/* 해딩으로 바꾸자  */}
                <Heading margin="8px" size={"lg"}>
                  원본 가사
                </Heading>
                <Text mb="8px" size={"sm"}>
                  반드시 문단 사이는 한줄 띄워야 합니다.
                </Text>

                <Textarea
                  size="md"
                  name="lyric"
                  minHeight="500px"
                  onChange={handleTextAreaChange}
                  placeholder="Imagine there's no heaven&#10;이미진 데어즈 노 헤븐&#10;천국이 없다고 상상해보세요.&#10;&#10;It's easy if you try&#10;잇츠 이지 이프 유 트라이&#10;해보면 쉬울 거에요&#10;&#10;No hell below us&#10;노 헬 비로우 어스&#10;우리 아래에는 지옥도 없고&#10;&#10;Above us only sky&#10;어베러스 어우니 스카이&#10;우리 위에는 오로지 하늘뿐이에요&#10;&#10;Imagine all the people&#10;이미진 올 더 피플&#10;모든 사람들을 상상해보세요&#10;&#10;Living for today... Ahh...&#10;리빙 포 투데이... 아...&#10;오늘을 살며... 아...&#10;&#10;Imagine there's no countries&#10;이미진 데어즈 노 컨트리즈&#10;국가도 없다고 상상해보세요&#10;&#10;It isn't hard to do&#10;잇 이즌트 하드 투 두&#10;이건 어렵지 않아요&#10;&#10;Nothing to kill or die for&#10;나딩 투 킬 오어 다이 포&#10;죽이거나 죽을 것도 없고&#10;&#10;And no religion too&#10;앤드 노 릴리전 투&#10;종교도 없어&#10;&#10;Imagine all the people&#10;이미진 올 더 피플&#10;모든 사람들을 상상해보세요&#10;&#10;Living life in peace... Ahh...&#10;리빙 라이프 인 피스... 아...&#10;평화롭게 생활하는 것을... 아...&#10;&#10;You may say I'm a dreamer&#10;유 메이 세이 아임 어 드리머&#10;당신은 나를 꿈꾸는 사람이라고 할지도 모르겠죠&#10;&#10;But I'm not the only one&#10;버트 아임 낫 더 오우니 원&#10;하지만 나만이 아니에요&#10;&#10;I hope someday you'll join us&#10;아이 호프 숨데이 윌 조인 어스&#10;언젠가 우리에 합류하길 바라요&#10;&#10;And the world will be as one&#10;앤드 더 월드 윌 비 어즈 원&#10;그리고 세상은 하나가 될 거에요&#10;"
                />
              </FormControl>
            </GridItem>
            <GridItem area="adp">
              <FormControl isRequired>
                <Heading margin="8px" size={"lg"}>
                  번안 가사
                </Heading>
                <Text mb="8px" size={"sm"}>
                  반드시 문단 사이는 한줄 띄워야 합니다.
                </Text>
                <Textarea
                  size="md"
                  name="lyricComment"
                  onChange={handleTextAreaChange}
                  minHeight="500px"
                  placeholder="천국이 없다고 상상해보세요.&#10;&#10;해보면 쉬울 거에요&#10;&#10;우리 아래에는 지옥도 없고&#10;&#10;우리 위에는 오로지 하늘뿐이에요&#10;&#10;모든 사람들을 상상해보세요&#10;&#10;오늘을 살며... 아...&#10;&#10;국가도 없다고 상상해보세요&#10;&#10;이건 어렵지 않아요&#10;&#10;죽이거나 죽을 것도 없고&#10;&#10;종교도 없어&#10;&#10;모든 사람들을 상상해보세요&#10;&#10;평화롭게 생활하는 것을... 아...&#10;&#10;당신은 나를 꿈꾸는 사람이라고 할지도 모르겠죠&#10;&#10;하지만 나만이 아니에요&#10;&#10;언젠가 우리에 합류하길 바라요&#10;&#10;그리고 세상은 하나가 될 거에요"
                />
              </FormControl>
            </GridItem>
          </Grid>
          <Box justifyContent={"center"} textAlign={"left"}>
            <Button maxWidth={20} type="submit" colorScheme="teal">
              Submit
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default NewPost;
