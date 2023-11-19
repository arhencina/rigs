"use client";

import ProductCard from "@/components/product";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useQuotation from "@/hooks/useQuotation";
import { useReactToPrint } from "react-to-print";
import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";

const Quotation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const quotation = useQuotation((state) => state.quotation);
  const [draftQuote, setDraftQuote] = useState<IProduct[]>([]);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onClickAddToQuote = (product: IProduct) => {
    const hasItemInQuote = draftQuote.some(
      (prod) => product.type === prod.type
    );
    if (hasItemInQuote) {
      alert("You already have an item like this in your quotation.");
    } else {
      setDraftQuote((prev) => [...prev, product]);
    }
  };

  const onClickRemove = (product: IProduct) => {
    setDraftQuote((prev) => prev.filter((prod) => prod.id !== product.id));
  };

  const mutation = useMutation({
    mutationFn: (products: IProduct[]) => {
      return api.post(`/saveQuote`, {
        products: products.map((product) => ({ id: product.id })),
      });
    },
  });
  return (
    <Box h={"100%"} w={"100%"} p={10}>
      <Flex gap={10} alignItems={"center"}>
        <Heading>
          Total: PHP{" "}
          {draftQuote.length > 0
            ? draftQuote
                .map((quote) => quote.price)
                .reduce((prev, curr) => {
                  const sum = Number(prev) + Number(curr);

                  return sum.toFixed(2);
                })
            : "0.00"}
        </Heading>
        <Button onClick={onOpen}>Check Quotation</Button>
      </Flex>
      <Box>
        <Heading>Processor</Heading>
        <SimpleGrid columns={5} spacing={5} h={"100%"} w={"100%"}>
          {quotation
            .filter((prod) => prod.type === "processor")
            .map((product) => (
              <Flex key={product.id} direction={"column"}>
                <ProductCard
                  productName={product.name}
                  productPrice={`PHP${Number(product.price).toFixed(2)}`}
                  productDescription={product.description}
                  productImage={product.image}
                />
                <Button onClick={() => onClickAddToQuote(product)}>
                  Add to Quote
                </Button>
              </Flex>
            ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Heading>Motherboard</Heading>
        <SimpleGrid columns={5} spacing={5} h={"100%"} w={"100%"}>
          {quotation
            .filter((prod) => prod.type === "motherboard")
            .map((product) => (
              <Flex key={product.id} direction={"column"}>
                <ProductCard
                  productName={product.name}
                  productPrice={`PHP${Number(product.price).toFixed(2)}`}
                  productDescription={product.description}
                  productImage={product.image}
                />
                <Button onClick={() => onClickAddToQuote(product)}>
                  Add to Quote
                </Button>
              </Flex>
            ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Heading>RAM</Heading>
        <SimpleGrid columns={5} spacing={5} h={"100%"} w={"100%"}>
          {quotation
            .filter((prod) => prod.type === "ram")
            .map((product) => (
              <Flex key={product.id} direction={"column"}>
                <ProductCard
                  productName={product.name}
                  productPrice={`PHP${Number(product.price).toFixed(2)}`}
                  productDescription={product.description}
                  productImage={product.image}
                />
                <Button onClick={() => onClickAddToQuote(product)}>
                  Add to Quote
                </Button>
              </Flex>
            ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Heading>Storage</Heading>
        <SimpleGrid columns={5} spacing={5} h={"100%"} w={"100%"}>
          {quotation
            .filter((prod) => prod.type === "storage")
            .map((product) => (
              <Flex key={product.id} direction={"column"}>
                <ProductCard
                  productName={product.name}
                  productPrice={`PHP${Number(product.price).toFixed(2)}`}
                  productDescription={product.description}
                  productImage={product.image}
                />
                <Button onClick={() => onClickAddToQuote(product)}>
                  Add to Quote
                </Button>
              </Flex>
            ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Heading>Power Supply</Heading>
        <SimpleGrid columns={5} spacing={5} h={"100%"} w={"100%"}>
          {quotation
            .filter((prod) => prod.type === "powerSupply")
            .map((product) => (
              <Flex key={product.id} direction={"column"}>
                <ProductCard
                  productName={product.name}
                  productPrice={`PHP${Number(product.price).toFixed(2)}`}
                  productDescription={product.description}
                  productImage={product.image}
                />
                <Button onClick={() => onClickAddToQuote(product)}>
                  Add to Quote
                </Button>
              </Flex>
            ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Heading>Case</Heading>
        <SimpleGrid columns={5} spacing={5} h={"100%"} w={"100%"}>
          {quotation
            .filter((prod) => prod.type === "case")
            .map((product) => (
              <Flex key={product.id} direction={"column"}>
                <ProductCard
                  productName={product.name}
                  productPrice={`PHP${Number(product.price).toFixed(2)}`}
                  productDescription={product.description}
                  productImage={product.image}
                />
                <Button onClick={() => onClickAddToQuote(product)}>
                  Add to Quote
                </Button>
              </Flex>
            ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Heading>Monitor</Heading>
        <SimpleGrid columns={5} spacing={5} h={"100%"} w={"100%"}>
          {quotation
            .filter((prod) => prod.type === "monitor")
            .map((product) => (
              <Flex key={product.id} direction={"column"}>
                <ProductCard
                  productName={product.name}
                  productPrice={`PHP${Number(product.price).toFixed(2)}`}
                  productDescription={product.description}
                  productImage={product.image}
                />
                <Button onClick={() => onClickAddToQuote(product)}>
                  Add to Quote
                </Button>
              </Flex>
            ))}
        </SimpleGrid>
      </Box>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent minW={"1080px"} ref={componentRef}>
            <ModalHeader>Quotation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                direction={"column"}
                justifyContent={"center"}
                gap={10}
                alignItems={"stretch"}
              >
                {draftQuote.length > 0 ? (
                  draftQuote.map((product) => (
                    <Flex
                      key={product.id}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      minW={"1000px"}
                    >
                      <Text minW={"250px"}>{product.name}</Text>
                      <Text minW={"100px"}>
                        {Number(product.price).toFixed(2)}
                      </Text>
                      <Button
                        background={"red"}
                        color={"white"}
                        onClick={() => onClickRemove(product)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  ))
                ) : (
                  <Heading size={"sm"}>No items in the quotation</Heading>
                )}
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"space-between"}>
              {draftQuote.length > 0 && (
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    mutation.mutate(draftQuote);
                    handlePrint();
                  }}
                >
                  Print Quotation
                </Button>
              )}
              <Heading size="md">
                Total: PHP{" "}
                {draftQuote.length > 0
                  ? draftQuote
                      .map((quote) => quote.price)
                      .reduce((prev, curr) => {
                        const sum = Number(prev) + Number(curr);

                        return sum.toFixed(2);
                      })
                  : "0.00"}
              </Heading>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
};

export default Quotation;
