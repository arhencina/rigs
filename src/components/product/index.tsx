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

const IMAGE = "no-image.png";
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
        maxW={"400px"}
        minH={"500px"}
        maxH={"500px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Image
          rounded={"lg"}
          height={230}
          width={282}
          objectFit={"contain"}
          src={productImage ? img : IMAGE}
          alt={"No Image Found"}
        />
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
