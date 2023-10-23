"use client";

import { Box } from "@chakra-ui/react";
import Header from "./header";
import Chat from "../chat";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box height={"100%"} width={"100%"}>
      <Header />
      {children}
      <Chat />
    </Box>
  );
};

export default PageLayout;
