import { Box, Card, CardBody, Heading, HStack, Icon, Image, Tag, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Music } from "../hooks/useMusics";
import YouTube from "react-youtube";
import YoutubeThumnailMaker from "./YoutubeThumnailMaker";
import { Link } from "react-router-dom";
import useCountries from "../hooks/useCountries";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

interface Props {
  music: Music;
}

const MusicCard = ({ music }: Props) => {
  const [liked, setLiked] = useState(music.likey);
  const [likes, setLikes] = useState(music.likes);
  const { onAuthStateChange, user } = useAuthContext();
  const toast = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const opts = {
    height: "300",
    width: "400",
  };
  const { data, isLoading, error } = useCountries();
  const onMouseEnter = () => {
    setIsPlaying(true); // 마우스를 올리면 자동 재생 시작
  };

  const onMouseLeave = () => {
    setIsPlaying(false); // 마우스를 떼면 재생 중지
  };
  const likeHnadle = async () => {
    if (!user?.email) {
      toast({
        position: "top",
        title: "실패",
        description: `로그인이 필요한 서비스입니다.`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/like", {
        musicId: music.id,
        email: user?.email,
      });
      music.likey = !music.likey;
      if (liked) {
        setLikes(likes - 1);
        music.likes = likes - 1;
      } else {
        setLikes(likes + 1);
        music.likes = likes + 1;
      }
      setLiked(!liked);
      toast({
        position: "top-right",
        title: music.likey ? "좋아요한 노래에 저장되었습니다." : "좋아요한 노래에서 삭제되었습니다.",
        description: `${music.title}`,
        status: music.likey ? "success" : "error",
        duration: 1000,
        isClosable: true,
      });
      // 성공적으로 요청을 보냈을 때의 처리
    } catch (error: any) {
      toast({
        position: "top",
        title: "실패",
        description: `${error?.response?.data}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      // 요청 실패 시의 처리
    }
  };

  const ClipboardHandle = () => {
    navigator.clipboard.writeText(`http://localhost:5173/musics/${music.id}`);
    toast({
      position: "top",
      title: "클립보드에 복사했습니다.",
      description: `친구들에게 공유해보세요!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const countryImageSrc = data.find((country) => country.name === music.country)?.image_background || "";
  // todo '' 안에 기본 이미지 넣기
  return (
    <Card>
      <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        {isPlaying ? <YouTube videoId={music.videoId} opts={opts} /> : <YoutubeThumnailMaker videoId={music.videoId} />}
      </Box>
      <Link to={`/musics/${music.id}`}>
        <CardBody>
          <HStack>
            <Image boxSize="45px" pr={2} borderRadius={8} objectFit="cover" src={countryImageSrc} alt={music.country} title={music.country} />
            <Box>
              <Heading fontSize="2xl">{music.title}</Heading>
              <Heading fontSize={"xl"} mb={"2"}>
                {" - " + music.singer}
              </Heading>
            </Box>
          </HStack>

          {/* <Text>{music.country}</Text> */}

          <HStack mt={1} mb={2}>
            {/* <Icon as={isFolded ? MdExpandMore : MdExpandLess} boxSize="32px" borderRadius={8} objectFit="cover" /> */}
            <Link to="#" onClick={likeHnadle}>
              <Icon as={liked ? AiFillHeart : AiOutlineHeart} boxSize="32px" borderRadius={8} objectFit="cover" />
            </Link>
            <Link to="#" onClick={ClipboardHandle}>
              <Icon as={FaRegPaperPlane} boxSize="32px" borderRadius={8} objectFit="cover" />
            </Link>
          </HStack>

          <HStack pb={2}>
            <Tag>{music.genre}</Tag>
            <Tag>{music.country}</Tag>
          </HStack>
          <Text> 좋아요 : {likes}</Text>
          <Text>발매 : {music.released ? new Date(music.released).toISOString().split("T")[0].replaceAll("-", ".") : ""}</Text>
          <Text>등록 : {music.posted ? new Date(music.posted).toISOString().split("T")[0].replaceAll("-", ".") : ""}</Text>
          <Text>글쓴이 : {music.postWriter}</Text>
        </CardBody>
      </Link>
    </Card>
  );
};

export default MusicCard;
