"use client";

import useQuotation from "@/hooks/useQuotation";
import api from "@/services/api";
import * as Icons from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Icon,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";

interface ISendInquiry {
  question: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<
    { message: React.ReactNode; user: string }[]
  >([
    {
      message: "Hi! What can I do for you?",
      user: "bot",
    },
  ]);
  const setQuotation = useQuotation((state) => state.setQuotation);
  const origin = window.location.origin;

  const mutation = useMutation({
    mutationFn: ({ question }: ISendInquiry) => {
      return api.post<IProduct[]>(`/chat?q=${question}`);
    },
    onError: (e) => {
      setMessages([
        ...messages,
        { message: "Sorry can you repeat your inquiry?", user: "bot" },
      ]);
    },
    onSuccess: (data) => {
      if (data.data && data.data.length > 0) {
        setQuotation(data.data);
        setMessages([
          ...messages,
          {
            message: (
              <>
                <Text>
                  {`Nice! I've found the right thing for you! Here it is!`}
                </Text>
                <Flex alignItems={"center"}>
                  <Link href={`${origin}/quotation`}>
                    <>
                      {/* <a target="_blank"> */}
                      {`${origin}/quotation`} <ExternalLinkIcon mx="2px" />
                      {/* </a> */}
                    </>
                  </Link>
                </Flex>
              </>
            ),
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
            <>{message.message}</>
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
            <>{message.message}</>
          </Box>
        );
      }
    });
  };

  const InputToolbar = () => {
    const [question, setQuestion] = useState<string>("");
    const { transcript, resetTranscript } = useSpeechRecognition();
    const startListening = () => {
      SpeechRecognition.startListening({ continuous: true });
    };
    const stopListeningAndRecordTranscript = () => {
      SpeechRecognition.stopListening();
      setQuestion(transcript);
    };

    const isError =
      question === "" || question === undefined || question === null;
    return (
      <Flex alignItems={"flex-end"} gap={5}>
        <Button
          colorScheme="teal"
          disabled={isError}
          onMouseDown={startListening}
          onTouchStart={startListening}
          onTouchEnd={stopListeningAndRecordTranscript}
          onMouseUp={stopListeningAndRecordTranscript}
        >
          <Icon as={FaMicrophone} />
        </Button>
        <FormControl id="question" isInvalid={isError}>
          {isError && (
            <FormErrorMessage>Please type your inquiry first.</FormErrorMessage>
          )}
          <InputGroup borderColor="#E0E1E7">
            <Input
              type="text"
              size="md"
              placeholder={
                transcript !== "" ||
                transcript !== undefined ||
                transcript !== null
                  ? transcript
                  : "Message"
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuestion(e.target.value)
              }
            />
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="teal"
          disabled={isError}
          onClick={() => {
            if (!isError) {
              setMessages([...messages, { message: question, user: "user" }]);
              mutation.mutate({ question: question });
              resetTranscript();
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
                overflowX={"hidden"}
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
