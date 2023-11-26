"use client";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaHotjar } from "react-icons/fa";

interface IProductCardProps {
  productName: string;
  productPrice: string;
  productImage: string;
  productDescription?: string;
  label?: string;
  trusted?: boolean;
}

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";
const ProductCard = ({
  productName,
  productPrice,
  productImage,
  label,
  trusted,
}: IProductCardProps) => {
  const img = `${productImage}`;
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        minH={"400px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${productImage ? img : IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={productImage ? img : IMAGE}
            alt={"product image"}
          />
        </Box>
        <Stack pt={10} align={"center"} justify={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {productName}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              {productPrice}
            </Text>
          </Stack>
          <Stack direction={"row"} align={"center"}>
            {label && label === "hot" ? (
              <Tooltip label="Hot right now!">
                <Box>
                  <Icon as={FaHotjar} fontSize={"24px"} color={"orange.500"} />
                </Box>
              </Tooltip>
            ) : null}
            {trusted && trusted === true ? (
              <Tooltip label="Trusted brand!">
                <Box>
                  <Icon
                    as={VscWorkspaceTrusted}
                    fontSize={"24px"}
                    color={"green"}
                  />
                </Box>
              </Tooltip>
            ) : null}
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default ProductCard;
