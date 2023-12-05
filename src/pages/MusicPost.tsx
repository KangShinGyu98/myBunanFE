import { Link, redirect, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import LylicsGrid from "../components/LyricsGrid";
import { Box, Button, Center, HStack, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { Music } from "../hooks/useMusics";
import DeleteModal from "../components/DeleteModal";

const MusicPost = () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옵니다.
  console.log("id", id);
  const [responseData, setResponseData] = useState({} as Music); // 응답 데이터 상태 추가
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  useEffect(() => {
    const getMusicPost = async () => {
      try {
        const response = await axios.get(`https://bunanbe.shop/music/${id}`);
        setResponseData(response.data); // 응답 데이터 설정
        console.log("response", response);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching music post:", error);
        setIsLoading(false);
      }
    };
    getMusicPost();
  }, [id]); // id가 변경될 때 요청 다시 보냄

  // const { data, error, isLoading } = useMusicPost(parseInt(id || "0"));
  const { user } = useAuthContext();
  const opts = {
    height: "300",
    width: "400",
  };

  return isLoading ? (
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  ) : (
    <>
      {responseData?.postWriter == user?.nickname && (
        <HStack>
          <DeleteModal music={responseData as Music} />
          <Link to={`/update/${id}`}>
            <Button>수정</Button>
          </Link>
        </HStack>
      )}
      <Center>
        <Stack>
          <YouTube videoId={responseData.videoId} opts={opts} key={responseData.id} />
          <LylicsGrid postId={parseInt(id || "0")} />
        </Stack>
      </Center>
    </>
  );
};

export default MusicPost;
