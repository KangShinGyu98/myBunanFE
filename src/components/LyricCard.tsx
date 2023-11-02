import { Box, Card, CardBody, Heading, HStack, Image, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Lyric } from "../hooks/useLyrics";
import axios from "axios";
import { set } from "mongoose";

interface Props {
  lyric: Lyric;
}
const LyricCard = ({ lyric }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [comment, setComment] = useState("");
  const [lyricComments, setLyricComments] = useState(lyric.lyricComments);
  const handleClick = () => {
    setIsOpened(!isOpened);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/lyricInput`, {
        content: comment,
        writer: "test", // 나중에 수정해야함 "test
        lyricId: lyric.id,
      });

      setLyricComments([...lyricComments, response.data]);
      setComment("");
      // 성공적으로 요청을 보냈을 때의 처리
    } catch (error) {
      // 요청 실패 시의 처리
    }
    console.log(comment);
  };

  if (lyricComments.length > 0) {
    if (isOpened) {
      return (
        <>
          {lyric.content.split("\n").map((line) => (
            <Text>{line}</Text>
          ))}
          <HStack>
            <Text onClick={handleClick}>&lt;</Text>
            <Box>
              {lyricComments.map((comment) => (
                <Text key={comment.id}>{comment.content}</Text>
              ))}

              <form onSubmit={handleSubmit}>
                <input type="text" value={comment} onChange={handleChange} placeholder="번안 가사를 입력하세요" />
                <button>등록</button>
              </form>
            </Box>
          </HStack>
        </>
      );
    } else {
      return (
        <>
          {lyric.content.split("\n").map((line) => (
            <Text>{line}</Text>
          ))}
          <HStack>
            <Text onClick={handleClick}>&gt;</Text>
            <Text>{lyricComments[0].content}</Text>
          </HStack>
        </>
      );
    }
  } else {
    // lyricComments.length === 0
    return (
      <>
        {lyric.content.split("\n").map((line) => (
          <Text>{line}</Text>
        ))}
        <Text>첫번째 개사를 작성하세요.</Text>
        <form onSubmit={handleSubmit}>
          <input type="text" value={comment} onChange={handleChange} placeholder="번안 가사를 입력하세요" />
          <button>등록</button>
        </form>
      </>
    );
  }
};

export default LyricCard;
