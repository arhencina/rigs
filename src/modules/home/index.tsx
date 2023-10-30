"use client";

import ProductCard from "@/components/product";
import api from "@/services/api";
import { Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "@chakra-ui/icons";
import React from "react";

const Homepage = () => {
  const fetchProducts = async (): Promise<IProduct[] | undefined> => {
    try {
      const { data } = await api.get<IProduct[]>("/products");
      if (data) {
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  };
  const { isLoading, error, data } = useQuery<IProduct[] | undefined>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <SimpleGrid columns={5} spacing={5} h={"100%"} w={"100%"}>
      {isLoading && (
        <Flex
          h={"100vh"}
          w={"100vw"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Spinner size={"lg"} />
        </Flex>
      )}
      {error && (
        <Flex
          h={"100vh"}
          w={"100vw"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={10}
        >
          <Icons.WarningTwoIcon boxSize={10} />
          <Heading>No products found.</Heading>
        </Flex>
      )}
      {!error &&
        data?.map((product) => (
          <ProductCard
            key={product.id}
            productName={product.name}
            productPrice={`PHP${Number(product.price).toFixed(2)}`}
            productDescription={product.description}
            productImage={product.image}
          />
        ))}
    </SimpleGrid>
  );
};

export default Homepage;
