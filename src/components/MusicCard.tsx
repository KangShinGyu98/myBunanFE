import { Box, Card, CardBody, Heading, HStack, Icon, Image, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Music } from "../hooks/useMusics";
import YouTube from "react-youtube";
import YoutubeThumnailMaker from "./YoutubeThumnailMaker";
import { Link } from "react-router-dom";
import useCountries from "../hooks/useCountries";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";

interface Props {
  music: Music;
}
// export interface Music {
//   id: number;
//   title: string;
//   singer: string;
//   songWriter: string;
//   postWriter: string;
//   tags: String[];
//   likes: number;
//   views: number;
//   country: string;
//   genre: string;
//   videoId: string;
//   posted: Date;
//   released: Date;
// }
const MusicCard = ({ music }: Props) => {
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
            <Icon as={AiOutlineHeart} boxSize="32px" borderRadius={8} objectFit="cover" />
            <Icon as={FaRegPaperPlane} boxSize="32px" borderRadius={8} objectFit="cover" />
          </HStack>

          <Text>{music.genre}</Text>
          <Text> 좋아요 : {music.likes}</Text>
          <Text>발매 : {music.released ? new Date(music.released).toISOString().split("T")[0].replaceAll("-", ".") : ""}</Text>
          <Text>등록 : {music.posted ? new Date(music.released).toISOString().split("T")[0].replaceAll("-", ".") : ""}</Text>
        </CardBody>
      </Link>
    </Card>
  );
};

export default MusicCard;
