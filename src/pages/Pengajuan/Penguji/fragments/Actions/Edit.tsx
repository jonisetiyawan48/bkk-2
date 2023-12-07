import { useDisclosure, IconButton } from '@chakra-ui/react';
import React from 'react';
import { Edit2 } from 'react-feather';
import ModalEditTest from '../ModalEditTest';

export default function Edit({ payload, reload }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalEditTest
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        reload={reload}
        payload={payload}
      />
      <IconButton
        onClick={onOpen}
        aria-label="edit"
        icon={<Edit2 />}
        borderRadius="2xl"
        p={2}
        bg="edit_bg"
        _hover={{ bg: 'edit_hover' }}
        _pressed={{ bg: 'edit_press' }}
        colorScheme="blue"
      />
    </>
  );
}
