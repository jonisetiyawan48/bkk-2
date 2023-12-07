import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Image,
  Text,
  Box,
  Grid,
  GridItem,
  Container,
  Input,
  Spacer,
  UseDisclosureReturn,
  Heading,
} from "@chakra-ui/react";

import React from "react";

export default function NewsModal({
  title,
  image,
  body,
  disclosure,
}: {
  title: string;
  image: string;
  body: string;
  disclosure: UseDisclosureReturn;
}) {
  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      scrollBehavior="inside"
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent
        maxW={{ base: "87.5vw", sm: "xl" }}
        py={4}
        borderRadius="3xl"
      >
        <ModalBody>
          <Heading mb={10}>{title}</Heading>
          <Image src={image} />
          <Text mt={10}>{body}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
