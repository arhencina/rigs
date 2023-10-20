"use client";

import Header from "@/components/layout/header";
import ProductSimple from "@/components/product";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";

const Homepage = () => {
  return (
    <Flex flexDirection={"column"} h={"100vh"} w={"100vw"}>
      <Header />
      <ProductSimple />
      <Flex
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        h={"100%"}
        w={"100%"}
        p={10}
      >
        <Popover>
          <PopoverTrigger>
            <Button
              colorScheme="teal"
              borderRadius={"50%"}
              height={"60px"}
              width={"60px"}
            >
              <AddIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Chat Bot</PopoverHeader>
            <PopoverBody>Hey! What would you like me to do?</PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default Homepage;
