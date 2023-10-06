import { Button, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Text, Textarea } from "@chakra-ui/react";
import { NewMusicQuery } from "../pages/CreateNewMusic";
import axios from "axios";
import { set } from "mongoose";
import Imaginelyric from "../data/Imaginelyric";
import ImaginelyricComment from "../data/ImaginelyricComment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface NewPostProps {
  musicQuery: NewMusicQuery;
  setMusicQuery: (arg: ((prevMusicQuery: NewMusicQuery) => NewMusicQuery) | NewMusicQuery) => void;
}
// export interface NewMusicQuery {
//     genre: Genre | null;
//     tags: string[];
//     country: Country | null;

//     title: string;
//     singer: string;
//     youtubeUrl: string;
//     songWriter: string;
//     postWriter: string;
//     lyric: string[];
//     lyricComment: string[];
//   }
const NewPost = ({ musicQuery, setMusicQuery }: NewPostProps) => {
  const navigate = useNavigate();
  const [lyricInput, setLyricInput] = useState({ lyricTemp: "", lyricCommentTemp: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMusicQuery(() => ({
      ...musicQuery,
      [name]: value,
    }));
    console.log(musicQuery);
  };

  const handleLyricChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLyricInput(() => ({
      ...lyricInput,
      [name]: value,
    }));
    console.log(lyricInput);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedMusicQuery = {
      ...musicQuery,
      lyric: lyricInput.lyricTemp.split("\n\n"),
      lyricComment: lyricInput.lyricCommentTemp.split("\n\n"),
      videoId: musicQuery.videoId.split("=")[1],
    };

    console.log("Create new post music query : ");
    console.log(updatedMusicQuery);

    setMusicQuery(() => updatedMusicQuery);

    try {
      const response = await axios.post("http://localhost:8080/createNewMusic", musicQuery);
      // 성공적으로 요청을 보냈을 때의 처리
      console.log("요청이 성공했습니다.");
      console.log("서버 응답 데이터:", response.data);
      navigate("/");
    } catch (error) {
      // 요청 실패 시의 처리
      console.error("요청이 실패했습니다.", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack marginRight={10} spacing={6}>
          <InputGroup size="sm">
            <InputLeftAddon children="제목" />
            <Input onChange={handleChange} name="title" placeholder="ex : 이메진 (IMAGINE) " />
            <InputLeftAddon children="가수" />
            <Input onChange={handleChange} name="singer" placeholder="ex : 존 레논 (John Lennon) " />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="작사" />
            <Input onChange={handleChange} name="lyricWriter" placeholder="ex : 미상 " />
            <InputRightAddon children="필수 x" />
            <InputLeftAddon children="작곡" />
            <Input onChange={handleChange} name="songWriter" placeholder="ex : 미상 " />
            <InputRightAddon children="필수 x" />
            <InputLeftAddon children="편곡" />
            <Input onChange={handleChange} name="arrangement" placeholder="ex : 미상 " />
            <InputRightAddon children="필수 x" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="발매일(Released Date)" />
            <Input onChange={handleChange} type="date" name="releasedDate" placeholder="ex : https://www.youtube.com/watch?v=YkgkThdzX-8" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Youtube 주소" />
            <Input onChange={handleChange} name="videoId" placeholder="ex : https://www.youtube.com/watch?v=YkgkThdzX-8" />
          </InputGroup>
          <Text mb="8px">원본 가사, 반드시 문단 사이는 한줄 띄워야 합니다.</Text>
          <Textarea
            name="lyricTemp"
            onChange={handleLyricChange}
            placeholder="Imagine there's no heaven&#10;이미진 데어즈 노 헤븐&#10;천국이 없다고 상상해보세요.&#10;&#10;It's easy if you try&#10;잇츠 이지 이프 유 트라이&#10;해보면 쉬울 거에요&#10;&#10;No hell below us&#10;노 헬 비로우 어스&#10;우리 아래에는 지옥도 없고&#10;&#10;Above us only sky&#10;어베러스 어우니 스카이&#10;우리 위에는 오로지 하늘뿐이에요&#10;&#10;Imagine all the people&#10;이미진 올 더 피플&#10;모든 사람들을 상상해보세요&#10;&#10;Living for today... Ahh...&#10;리빙 포 투데이... 아...&#10;오늘을 살며... 아...&#10;&#10;Imagine there's no countries&#10;이미진 데어즈 노 컨트리즈&#10;국가도 없다고 상상해보세요&#10;&#10;It isn't hard to do&#10;잇 이즌트 하드 투 두&#10;이건 어렵지 않아요&#10;&#10;Nothing to kill or die for&#10;나딩 투 킬 오어 다이 포&#10;죽이거나 죽을 것도 없고&#10;&#10;And no religion too&#10;앤드 노 릴리전 투&#10;종교도 없어&#10;&#10;Imagine all the people&#10;이미진 올 더 피플&#10;모든 사람들을 상상해보세요&#10;&#10;Living life in peace... Ahh...&#10;리빙 라이프 인 피스... 아...&#10;평화롭게 생활하는 것을... 아...&#10;&#10;You may say I'm a dreamer&#10;유 메이 세이 아임 어 드리머&#10;당신은 나를 꿈꾸는 사람이라고 할지도 모르겠죠&#10;&#10;But I'm not the only one&#10;버트 아임 낫 더 오우니 원&#10;하지만 나만이 아니에요&#10;&#10;I hope someday you'll join us&#10;아이 호프 숨데이 윌 조인 어스&#10;언젠가 우리에 합류하길 바라요&#10;&#10;And the world will be as one&#10;앤드 더 월드 윌 비 어즈 원&#10;그리고 세상은 하나가 될 거에요&#10;"
            size="sm"
          />
          <Text mb="8px">번안 가사, 반드시 문단 사이는 한줄 띄워야 합니다.</Text>
          <Textarea
            name="lyricCommentTemp"
            onChange={handleLyricChange}
            placeholder="천국이 없다고 상상해보세요.&#10;&#10;해보면 쉬울 거에요&#10;&#10;우리 아래에는 지옥도 없고&#10;&#10;우리 위에는 오로지 하늘뿐이에요&#10;&#10;모든 사람들을 상상해보세요&#10;&#10;오늘을 살며... 아...&#10;&#10;국가도 없다고 상상해보세요&#10;&#10;이건 어렵지 않아요&#10;&#10;죽이거나 죽을 것도 없고&#10;&#10;종교도 없어&#10;&#10;모든 사람들을 상상해보세요&#10;&#10;평화롭게 생활하는 것을... 아...&#10;&#10;당신은 나를 꿈꾸는 사람이라고 할지도 모르겠죠&#10;&#10;하지만 나만이 아니에요&#10;&#10;언젠가 우리에 합류하길 바라요&#10;&#10;그리고 세상은 하나가 될 거에요"
            size="sm"
          />

          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </>
  );
};

export default NewPost;
