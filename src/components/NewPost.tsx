import { Button, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack } from "@chakra-ui/react";
import { NewMusicQuery } from "../pages/CreateNewMusic";
import axios from "axios";

export interface NewPostProps {
  musicQuery: NewMusicQuery;
  setMusicQuery: (musicQuery: NewMusicQuery) => void;
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMusicQuery({
      ...musicQuery,
      [name]: value,
    });
  };
  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Create new post music query : ");
    console.log(musicQuery);

    try {
      const response = await axios.post("http://localhost:8080/createNewMusic", musicQuery);
      // 성공적으로 요청을 보냈을 때의 처리
      console.log("요청이 성공했습니다.");
      console.log("서버 응답 데이터:", response.data);
    } catch (error) {
      // 요청 실패 시의 처리
      console.error("요청이 실패했습니다.", error);
    }
  };

  return (
    <>
      <form onSubmit={signUp}>
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
            <InputLeftAddon children="Youtube 주소" />
            <Input onChange={handleChange} name="youtubeUrl" placeholder="ex : https://www.youtube.com/watch?v=YkgkThdzX-8" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="원본 가사, 반드시 문단 사이는 한줄 띄워야 합니다." />
            <Input onChange={handleChange} name="lyric" placeholder="ex : " />
            <InputLeftAddon children="번안 가사" />
            <Input onChange={handleChange} name="lyricComment" placeholder="ex : " />
          </InputGroup>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </>
  );
};

export default NewPost;
