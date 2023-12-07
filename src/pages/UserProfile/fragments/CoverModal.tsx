import React from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  UseDisclosureReturn,
} from '@chakra-ui/react';

export default function CoverModal({
  disclosure,
}: {
  disclosure: UseDisclosureReturn;
}) {
  const { isOpen, onOpen, onClose } = disclosure;

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent rounded={20}>
        <ModalBody p={8}>
          
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
