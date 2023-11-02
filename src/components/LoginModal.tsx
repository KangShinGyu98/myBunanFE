import {
  Button,
  FormControl,
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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
      });

      // 성공적으로 요청을 보냈을 때의 처리
      console.log("요청이 성공했습니다.");
      console.log("서버 응답 데이터:", response.data);
    } catch (error) {
      // 요청 실패 시의 처리
      console.error("요청이 실패했습니다.", error);
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
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>이메일</FormLabel>
              <Input name="email" ref={initialRef} placeholder="email@naver.com" type="email" onChange={handleEmailChange} />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>비밀번호</FormLabel>
              <Input name="password" placeholder="**********" type="password" onChange={handlePasswordChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
