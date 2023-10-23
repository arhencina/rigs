"use client";

import ProductCard from "@/components/product";
import api from "@/services/api";
import { Box, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "apisauce";
import React, { useState } from "react";

const Homepage = () => {
  const fetchProducts = async (): Promise<IProduct[]> => {
    try {
      const { data } = await api.get<IProduct[]>("/products");
      if (data) {
        return data;
      }
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 0,
        name: "error",
        image: "",
        price: "",
        type: "processor",
        description: "",
      },
    ];
  };
  const { isLoading, error, data } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <SimpleGrid columns={5} spacing={10} h={"100%"} w={"100%"}>
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
      {!isLoading &&
        data &&
        data.map((product) => (
          <ProductCard
            key={product.id}
            productName={product.name}
            productPrice={Number(product.price).toFixed(2)}
          />
        ))}
      {error && <Heading>Failed fetching data.</Heading>}
    </SimpleGrid>
  );
};

export default Homepage;
