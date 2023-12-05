import React, { useState } from "react";
import { Flex, HStack, Icon, Tag, TagLabel, TagLeftIcon, Text, useToast } from "@chakra-ui/react";
import { LyricComment } from "../hooks/useLyrics";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  comment: LyricComment;
}
const MyLyricComment = ({ comment }: Props) => {
  const toast = useToast();
  const [liked, setLiked] = useState(comment.likey);
  const [likes, setLikes] = useState(comment.likes);
  const { onAuthStateChange, user, isInitializing } = useAuthContext();
  const likeHnadle = async () => {
    if (!user && !isInitializing) {
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
      const response = await axios.post("https://bunanbe.shop/lyricComment/like", {
        lyricCommentId: comment.id,
        email: user?.email,
      });
      comment.likey = !comment.likey;
      if (liked) {
        setLikes(likes - 1);
        comment.likes = likes - 1;
      } else {
        setLikes(likes + 1);
        comment.likes = likes + 1;
      }
      setLiked(!liked);
      toast({
        position: "top-right",
        title: comment.likey ? "가사를 좋아요 했습니다." : "좋아요한 가사에서 삭제했습니다.",
        status: comment.likey ? "success" : "error",
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

  return (
    <HStack justifyContent={"space-between"}>
      <Text fontSize={"lg"} key={comment.id}>
        {comment.content}
      </Text>
      <HStack>
        <Tag cursor={"pointer"} onClick={likeHnadle}>
          <TagLeftIcon as={liked ? AiFillHeart : AiOutlineHeart} boxSize="20px" borderRadius={8} objectFit="cover" />
          <TagLabel>{comment.likes}</TagLabel>
        </Tag>
      </HStack>
    </HStack>
  );
};

export default MyLyricComment;
