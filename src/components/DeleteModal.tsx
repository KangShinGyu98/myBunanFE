import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Music } from "../hooks/useMusics";
import { useNavigate } from "react-router-dom";

interface Props {
  music: Music;
}

const DeleteModal = ({ music }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const initialRef = React.useRef(null);

  const toast = useToast();

  const { user } = useAuthContext();

  const deleteHandle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.delete("http://localhost:8080/music/delete", {
        params: {
          nickname: user?.nickname,
          email: user?.email,
          musicId: music.id,
        },
      });

      toast({
        position: "top",
        title: "삭제에 성공했습니다.",
        description: `${music.title}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // 성공적으로 요청을 보냈을 때의 처리
      onClose();
      navigate("/");
    } catch (error: any) {
      toast({
        position: "top",
        title: "삭제에 실패했습니다.",
        description: `${error?.response?.data}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      // 요청 실패 시의 처리
    }
  };
  return (
    <>
      <Button onClick={onOpen}>삭제</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>정말로 삭제하시겠습니까?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button onClick={deleteHandle} colorScheme="blue" mr={3}>
              삭제
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
