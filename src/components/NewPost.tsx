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
      const response = await axios.post("https://bunanbe.shop/createNewMusic", {
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
            <Input maxWidth={310} onChange={handleChange} name="remixArtist" placeholder="ex : 미상 " />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="발매일(Released Date)" />
            <Input
              maxWidth={300}
              onChange={handleChange}
              type="date"
              name="released"
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
                  원본 가사 *
                </Heading>
                <Text mb="8px" size={"sm"}>
                  반드시 문단 사이는 한줄 띄워야 합니다.
                </Text>

                <Textarea
                  size="md"
                  name="lyric"
                  minHeight="500px"
                  onChange={handleTextAreaChange}
                  placeholder="例えば僕ら二人　煌めく映画のように&#10;예를 들어 우리 둘, 반짝이는 영화처럼&#10;타토에바 보쿠라 후타리 키라메쿠 에이가노 요니&#10;&#10;出会いなおせたらどうしたい&#10;다시 만난다면 어떨 것 같아&#10;데아이 나오세타라 도시타이&#10;&#10;何も謎めいてない　今日は昨日の続き&#10;알 수 없는 건 아무것도 없어, 오늘은 어제의 연속&#10;나니모 나조메이테 나이 쿄오와 키노노 츠즈키&#10;&#10;日々は続くただぼんやり&#10;나날은 이어져, 그저 하염없이&#10;히비와 츠즈쿠 타다 본야리&#10;&#10;微かな足音　シーツの置く場所&#10;조용한 발소리, 시트를 두는 곳&#10;카스카나 아시오토 시츠노 오쿠 바쇼&#10;&#10;それだけで全てわかってしまうよ&#10;그것만으로도 전부 알아버리고 말아&#10;소레다케데 스베테 와캇테 시마우요&#10;&#10;見え透いた嘘も隠した本当も&#10;뻔히 보이는 거짓도, 숨겨둔 진실도&#10;미에스이타 우소모 카쿠시타 혼토모&#10;&#10;その全て愛おしかった&#10;그 모든 것이 사랑스러웠어&#10;소노 스베테 이토오시캇타&#10;&#10;レディー　笑わないで聞いて&#10;레이디, 웃지 말고 들어줘&#10;레디 와라와나이데 키이테&#10;&#10;ハニー　見つめ合っていたくて&#10;허니, 서로 바라보고 싶어서&#10;하니 미츠메앗테 이타쿠테&#10;&#10;君と二人　行ったり来たりしたいだけ&#10;너랑 둘이서, 왔다 갔다 하고 싶을 뿐이야&#10;키미토 후타리 잇타리 키타리 시타이 다케&#10;&#10;ベイビー　子供みたいに恋がしたい&#10;베이비, 아이들처럼 사랑이 하고 싶어&#10;베이비 코도모 미타이니 코이가 시타이&#10;&#10;書き散らしていく僕らのストーリーライン&#10;마구잡이로 쓴 우리의 스토리라인&#10;카키치라시테유쿠 보쿠라노 스토리 라인&#10;&#10;例えばどっちか一人　ひどい不幸が襲い&#10;예를 들어 우리 둘 중 하나가, 심각한 불행이 덮쳐서&#10;타토에바 돗치카 히토리 히도이 후코가 오소이&#10;&#10;二度と会えなくなったら&#10;다시는 만날 수 없게 된다면&#10;니도토 아에나쿠 낫타라&#10;&#10;考えた矢先に　泣けてしまうくらい&#10;생각하자마자 눈물이 나와버릴 것 같아&#10;칸가에타 야사키니 나케테 시마우 쿠라이&#10;&#10;日々は続く一層確かに&#10;나날은 이어져, 한층 더 확실하게&#10;히비와 츠즈쿠 잇소 타시카니&#10;&#10;いつもの暗い顔　チープな戯言&#10;평소와 같은 어두운 얼굴, 시시한 농담&#10;이츠모노 쿠라이 카오 치프나 자레고토&#10;&#10;見過ごすようにまた優しいんだろう&#10;보지 못할 정도로 상냥한 거겠지&#10;미스고스 요니 마타 야사시인다로&#10;&#10;見え透いた嘘も隠した本当も&#10;뻔히 보이는 거짓도, 숨겨둔 진실도&#10;미에스이타 우소모 카쿠시타 혼토모&#10;&#10;その目から伝わってきた&#10;그 눈으로부터 전해져 왔어&#10;소노 메카라 츠타왓테 키타&#10;引っ張ったり噛み付いたり　傷ついたふりしてみたり&#10;당겼다가, 물고 늘어졌다가, 상처준 척하다가&#10;힛팟타리 카미츠이타리 키즈츠이타 후리시테 미타리&#10;明日の朝に持ち越したり　浮ついたりして&#10;내일 아침으로 미뤘다가, 들떴다가&#10;아스노 아사니 모치코시타리 우와츠이타리 시테&#10;&#10;思いきり傷つきたい　いつまでもそばにいたい&#10;실컷 상처 입고 싶어, 언제까지라도 곁에 있고 싶어&#10;오모이키리 키즈츠키타이 이츠마데모 소바니 이타이&#10;&#10;今すぐ行方をくらまそう&#10;지금 당장 행방불명이 되자&#10;이마 스구 유쿠에오 쿠라마소&#10;レディー　何も言わないで&#10;&#10;레이디, 아무 말도 하지 말아줘&#10;레디 나니모 이와나이데&#10;&#10;ハニー　僕の手を取ってくれ&#10;허니, 내 손을 잡아줘&#10;하니 보쿠노 테오 톳테쿠레&#10;&#10;君以外に　考えられないだけ&#10;너밖에 생각하지 못할 뿐&#10;키미 이가이니 칸가에라레나이 다케&#10;&#10;ベイビー　あの頃みたいに恋がしたい&#10;베이비, 그때처럼 사랑하고 싶어&#10;베이비 아노 코로 미타이니 코이가 시타이&#10;&#10;書き散らしていく　踊り続ける&#10;마구잡이로 쓰며, 계속해서 춤춰&#10;카키치라시테유쿠 오도리 츠즈케루&#10;&#10;レディー　笑わないで聞いて&#10;레이디, 웃지 말고 들어줘&#10;레디 와라와나이데 키이테&#10;&#10;ハニー　見つめ合っていたくて&#10;허니, 서로 바라보고 싶어서&#10;하니 미츠메앗테 이타쿠테&#10;&#10;&#10;君と二人　行ったり来たりしたいだけ&#10;너랑 둘이서, 왔다 갔다 하고 싶을 뿐이야&#10;키미토 후타리 잇타리 키타리 시타이 다케&#10;&#10;ベイビー　子供みたいに恋がしたい&#10;베이비, 아이들 같은 사랑이 하고 싶어&#10;베이비 코도모 미타이니 코이가 시타이&#10;&#10;書き散らしていく僕らのストーリーライン&#10;마구잡이로 쓴 우리의 스토리라인&#10;카키치라시테유쿠 보쿠라노 스토리 라인&#10;"
                />
              </FormControl>
            </GridItem>
            <GridItem area="adp">
              <FormControl isRequired>
                <Heading margin="8px" size={"lg"}>
                  번안 가사 (선택)
                </Heading>
                <Text mb="8px" size={"sm"}>
                  반드시 문단 사이는 한줄 띄워야 합니다.
                </Text>
                <Textarea
                  size="md"
                  name="lyricComment"
                  onChange={handleTextAreaChange}
                  minHeight="500px"
                  placeholder="만약에 너와 나 우연히 길을 걷다 아주 우연히&#10;&#10;만나면 나 어떠려나 '보고싶다니'&#10;&#10;다가가고 싶은 그대의 마음까지 아주 천천히&#10;&#10;하루하루 다가가다 봄 여름 &#10;&#10;오늘따라 어설펐던 실수도 보고파서&#10;&#10;손에 작게 그대 이름 살짝 써내리고 &#10;&#10;뒤에 쓰일 내 이름도 한 겹 살짝 포개고&#10;&#10;사랑스러운 이 도시같아&#10;&#10;Lady 바라봐 내게 기대&#10;&#10;Honey 그대 내 어깨에 닿을 때&#10;&#10;우리 단 둘이 기다린 이 날이 시작에 닿게 &#10;&#10;Baby 그대만 마주치면 나는 어린 아이&#10;&#10;함께 칠해줄래 우 꿈같은 스토리라인&#10;&#10;바빠지면 어떡하지 우리 뜸하게 되려나 서서히&#10;&#10;보고 싶어지니까 ‘나타나’&#10;&#10;담담히 맘을 삭히니 한 여름 밤 같은 꿈들이&#10;&#10;뒤를 계속 쫓고있어 다시 겨울&#10;&#10;It’s no no 따분하고 진부한 설렘, 고동&#10;&#10;Miss you, got you 모두 사랑에 삼켜진 채로 &#10;&#10;뒤에 쓰일 마음 적어 한 겹 살짝 포개고&#10;&#10;설렘을 따라 한 걸음 다가가&#10;&#10;Rewind darling, 다시 darling&#10;&#10;그저 그러다 우리 시간을 달리다가 돌아서&#10;&#10;이 먼지같이 우리 바람처럼 사라질까&#10;&#10;I want to be with you my lovey&#10;&#10;He’s not alone cause I’m here, darling&#10;&#10;너와 쓰고픈 꿈이 너무나 많아서&#10;&#10;Lady 고민은 그만할래&#10;&#10;Honey 그대로 내 손 잡을래&#10;&#10;이미 입가엔 이 웃음이 나네 나 이렇게&#10;&#10;Baby 그대만 마주치면 나는 어린 아이&#10;&#10;함께 칠해줄래 우 같이 춤을 추기를&#10;&#10;Lady 바라봐 내게 기대&#10;&#10;Honey 그대 내 어깨에 닿을 때&#10;&#10;우리 단 둘이 기다린 이 날이 시작에 닿게 &#10;&#10;Baby 그대만 마주치면 나는 어린 아이&#10;&#10;"
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
