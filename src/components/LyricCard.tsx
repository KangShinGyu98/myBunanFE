import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Lyric } from "../hooks/useLyrics";
import axios from "axios";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import MyLyricComment from "./MyLyricComment";

interface Props {
  lyric: Lyric;
}
const LyricCard = ({ lyric }: Props) => {
  const toast = useToast();
  const { user, isInitializing, onAuthStateChange } = useAuthContext();
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
      const response = await axios.post(`http://localhost:8080/lyricInput`, {
        content: comment,
        writer: user?.nickname, // 나중에 수정해야함 "test
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
        <Box pl={75} pb={10}>
          <HStack alignItems="flex-end" justifyContent={"space-between"}>
            <Stack spacing={0}>
              {lyric.content.split("\n").map((line, idx) => (
                <Text key={idx} fontSize={"lg"}>
                  {line}
                </Text>
              ))}
            </Stack>
            <Text>좋아요</Text>
          </HStack>
          <HStack ml={-10} mt={2} alignItems="flex-start">
            <Icon as={MdExpandLess} onClick={handleClick} boxSize="32px" borderRadius={8} objectFit="cover" />
            <Box width={"100%"}>
              {lyricComments.map((comment, idx) => (
                <MyLyricComment key={idx} comment={comment} />
              ))}
            </Box>
          </HStack>
          <form onSubmit={handleSubmit}>
            <InputGroup mt={3}>
              <Input type="text" value={comment} onChange={handleChange} placeholder="번안 가사를 입력하세요" mr={2} />
              <Button h="auto" type="submit" width={"5rem"}>
                등록
              </Button>
              {/* <button>등록</button> */}
            </InputGroup>
          </form>
        </Box>
      );
    } else {
      return (
        <Box pl={75} pb={10}>
          {lyric.content.split("\n").map((line, idx) => (
            <Text key={idx} fontSize={"lg"}>
              {line}
            </Text>
          ))}
          <HStack ml={-10} mt={2}>
            <Icon as={MdExpandMore} onClick={handleClick} boxSize="32px" borderRadius={8} objectFit="cover" />
            <Text fontSize={"lg"}>{lyricComments[0].content}</Text>
          </HStack>
        </Box>
      );
    }
  } else {
    // lyricComments.length === 0
    return (
      <>
        <Stack spacing={0}>
          {lyric.content.split("\n").map((line, idx) => (
            <Text key={idx} fontSize={"lg"}>
              {line}
            </Text>
          ))}
        </Stack>
        <Text>가사를 작성하세요.</Text>
        <form onSubmit={handleSubmit}>
          <InputGroup mt={3}>
            <Input type="text" value={comment} onChange={handleChange} placeholder="번안 가사를 입력하세요" mr={2} />
            <Button h="auto" type="submit" width={"5rem"}>
              등록
            </Button>
            {/* <button>등록</button> */}
          </InputGroup>
        </form>
      </>
    );
  }
};

export default LyricCard;
