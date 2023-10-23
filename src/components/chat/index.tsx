"use client";

import api from "@/services/api";
import * as Icons from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { isError } from "util";

interface ISendInquiry {
  question: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<{ message: string; user: string }[]>(
    [
      {
        message: "Hi! What can I do for you?",
        user: "bot",
      },
    ]
  );

  const mutation = useMutation({
    mutationFn: ({ question }: ISendInquiry) => {
      return api.post<IProduct[]>(`/chat?q=${question}`);
    },
    onError: () => {
      setMessages([
        ...messages,
        { message: "Sorry can you repeat your inquiry?", user: "bot" },
      ]);
    },
    onSuccess: (data) => {
      if (data.data && data.data.length > 0) {
        setMessages([
          ...messages,
          {
            message: `Nice! I've found the right thing for you! Here it is!
            ${data.data.map(
              (product) =>
                `${product.name} - PHP${Number(product.price).toFixed(2)}`
            )}`,
            user: "bot",
          },
        ]);
      } else {
        setMessages([
          ...messages,
          {
            message: `Sorry can you repeat your inquiry?`,
            user: "bot",
          },
        ]);
      }
    },
  });

  const Conversation = () => {
    return messages.map((message, index) => {
      if (message.user === "bot") {
        return (
          <Box
            key={index}
            p={4}
            alignSelf={"flex-start"}
            backgroundColor="#E0E1E7"
            borderRadius={"25px"}
          >
            <Text>{message.message}</Text>
          </Box>
        );
      } else {
        return (
          <Box
            key={index}
            p={4}
            alignSelf={"flex-end"}
            color={"white"}
            backgroundColor={"teal"}
            borderRadius={"25px"}
          >
            <Text>{message.message}</Text>
          </Box>
        );
      }
    });
  };

  const InputToolbar = () => {
    const [question, setQuestion] = useState<string>("");

    const isError =
      question === "" || question === undefined || question === null;
    return (
      <Flex alignItems={"flex-end"} gap={5}>
        <FormControl id="question" isInvalid={isError}>
          {isError && (
            <FormErrorMessage>Please type your inquiry first.</FormErrorMessage>
          )}
          <InputGroup borderColor="#E0E1E7">
            <Input
              type="text"
              size="md"
              placeholder="Message"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuestion(e.target.value)
              }
            />
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="teal"
          onClick={() => {
            if (!isError) {
              setMessages([...messages, { message: question, user: "user" }]);
              mutation.mutate({ question: question });
            }
          }}
        >
          <Icons.ArrowForwardIcon />
        </Button>
      </Flex>
    );
  };

  return (
    <Box position={"sticky"} bottom={0} float={"right"} zIndex={1080} p={10}>
      <Popover>
        <PopoverTrigger>
          <Button
            colorScheme="teal"
            borderRadius={"50%"}
            height={"70px"}
            width={"70px"}
          >
            <Icons.ChatIcon boxSize={6} />
          </Button>
        </PopoverTrigger>
        <PopoverContent w={"500px"}>
          <PopoverCloseButton />
          <PopoverHeader>Rigsmith Helper</PopoverHeader>
          <PopoverBody h={"500px"}>
            <Flex
              h={"100%"}
              w={"100%"}
              justifyContent={"flex-end"}
              direction={"column"}
              gap={"30px"}
              overscrollX={"none"}
            >
              <Flex
                direction={"column"}
                h={"100%"}
                w={"100%"}
                gap={5}
                overflow={"scroll"}
              >
                <Conversation />
              </Flex>
              <InputToolbar />
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Chat;
