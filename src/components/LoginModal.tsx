import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { decodeToken, getToken, useAuthContext, User } from "../context/AuthContext";
import { MusicQuery } from "../pages/MainPage";

interface Props {
  musicQuery: MusicQuery;
  setMusicQuery: (musicQuery: MusicQuery) => void;
}

const LoginModal = ({ musicQuery, setMusicQuery }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const toast = useToast();

  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const { onAuthStateChange, user } = useAuthContext();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://bunanbe.shop/member/login", {
        email: email,
        password: password,
      });

      document.cookie = `token=${response.data as string}; path=/`;
      onAuthStateChange("login");
      const token = response.data as string;
      const nickname = decodeToken(token)?.nickname || null;
      setMusicQuery({ ...musicQuery, email } as MusicQuery);

      toast({
        position: "top",
        title: "로그인에 성공했습니다.",
        // description: `${response.data.nickname} 님 환영합니다.`,
        description: `${nickname} 님 환영합니다.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // 성공적으로 요청을 보냈을 때의 처리
      onClose();
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
    <>
      <Button onClick={onOpen}>로그인</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그인</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={login}>
            <ModalBody pb={6}>
              <FormControl mb={2} isRequired>
                <FormLabel>이메일</FormLabel>
                <Input name="email" placeholder="email@naver.com" type="email" onChange={handleEmailChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>비밀번호</FormLabel>
                <Input name="password" placeholder="**********" type="password" onChange={handlePasswordChange} />
                <FormHelperText>비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                로그인
              </Button>
              <Button onClick={onClose}>취소</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
