import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { useAuthContext } from "../context/AuthContext";
import { MusicQuery } from "../pages/MainPage";

interface Props {
  musicQuery: MusicQuery;
  setMusicQuery: (musicQuery: MusicQuery) => void;
}

const SignUpModal = ({ musicQuery, setMusicQuery }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onAuthStateChange } = useAuthContext();
  const initialRef = React.useRef(null);
  const toast = useToast();

  const [nickname, setNickname] = useState("");
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const [passwordCheck, setPasswordCheck] = useState("");
  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => setPasswordCheck(e.target.value);
  const [code, setCode] = useState("");
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value);

  const nicknameCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://bunanbe.shop/member/nicknameCheck", {
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

  const emailCheckSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast({
      position: "top",
      title: `${email} 로 인증번호를 보내는 중입니다.`,
      status: "loading",
      duration: 4000,
      isClosable: true,
    });
    try {
      const response = await axios.post("https://bunanbe.shop/mail/email", {
        email: email,
      });

      toast({
        position: "top",
        title: `${email} 로 인증번호를 보냈습니다.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // 성공적으로 요청을 보냈을 때의 처리
    } catch (error: any) {
      toast({
        position: "top",
        title: `${email} 은 사용할 수 없습니다.`,
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
      const response = await axios.post("https://bunanbe.shop/member/signUp", {
        nickname: nickname,
        email: email,
        password: password,
        passwordCheck: passwordCheck,
        code: parseInt(code, 10),
      });

      document.cookie = `token=${response.data as string}; path=/`;
      onAuthStateChange("login");
      setMusicQuery({ ...musicQuery, email } as MusicQuery);

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
  const isError = password !== passwordCheck;
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
                  <InputRightElement width="5rem">
                    <Button mr={2} h="1.75rem" size="sm" onClick={nicknameCheck}>
                      중복확인
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>사이트에서 사용할 별명을 정해주세요</FormHelperText>
              </FormControl>
              <FormControl mb={2} isRequired>
                <FormLabel>이메일</FormLabel>
                <InputGroup>
                  <Input name="email" placeholder="email@naver.com" type="email" onChange={handleEmailChange} />
                  <InputRightElement width="8rem">
                    <Button mr={2} h="1.75rem" size="sm" onClick={emailCheckSend}>
                      인증번호 보내기
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl mb={2} isRequired>
                <FormLabel>이메일 인증번호</FormLabel>
                <InputGroup>
                  <Input name="code" placeholder="000000" type="text" onChange={handleCodeChange} />
                </InputGroup>
                <FormHelperText>공백을 주의하세요</FormHelperText>
              </FormControl>
              <FormControl mb={2} isRequired>
                <FormLabel>비밀번호</FormLabel>
                <Input name="password" placeholder="**********" type="password" onChange={handlePasswordChange} />
              </FormControl>
              <FormControl isRequired isInvalid={isError}>
                <FormLabel>비밀번호 확인</FormLabel>
                <Input name="passwordCheck" placeholder="**********" type="password" onChange={handlePasswordCheckChange} />
                {isError && <FormErrorMessage>비밀번호와 일치하지 않습니다.</FormErrorMessage>}
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
