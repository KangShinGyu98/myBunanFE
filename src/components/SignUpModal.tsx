import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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

const SignUpModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const toast = useToast();

  const [nickname, setNickname] = useState("");
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const nicknameCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/member/nicknameCheck", {
        nickname: nickname,
      });
      toast({
        position: "top",
        title: `${nickname} 은 사용가능 합니다.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // 성공적으로 요청을 보냈을 때의 처리
    } catch (error: any) {
      toast({
        position: "top",
        title: `${nickname} 은 사용할 수 없습니다.`,
        description: `${error?.response?.data}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      // 요청 실패 시의 처리
    }
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/member/signUp", {
        nickname: nickname,
        email: email,
        password: password,
      });
      toast({
        position: "top",
        title: "회원가입이 성공했습니다.",
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
        title: "회원가입에 실패했습니다.",
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
      <Button onClick={onOpen}>회원가입</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>회원가입</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={signUp}>
            <ModalBody pb={6}>
              <FormControl mb={2} isRequired>
                <FormLabel>닉네임</FormLabel>
                <InputGroup>
                  <Input name="nickname" ref={initialRef} placeholder="별명" type="text" onChange={handleNicknameChange} />
                  <InputRightElement width="4.5rem">
                    <Button mr={2} h="1.75rem" size="sm" onClick={nicknameCheck}>
                      중복확인
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>사이트에서 사용할 별명을 정해주세요</FormHelperText>
              </FormControl>
              <FormControl mb={2} isRequired>
                <FormLabel>이메일</FormLabel>
                <Input name="email" placeholder="email@naver.com" type="email" onChange={handleEmailChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>비밀번호</FormLabel>
                <Input name="password" placeholder="**********" type="password" onChange={handlePasswordChange} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                회원가입
              </Button>
              <Button onClick={onClose}>취소</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpModal;
