import { useDisclosure, IconButton } from '@chakra-ui/react';
import React from 'react';
import { Trash2 } from 'react-feather';
import DeleteModal from './DeleteModal';

export default function DeleteButton({ payload, reload }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        payload={payload}
        reload={reload}
      />
      <IconButton
        onClick={onOpen}
        aria-label="delete"
        icon={<Trash2 />}
        borderRadius="2xl"
        p={2}
        bg="delete_bg"
        _hover={{ bg: 'delete_hover' }}
        _pressed={{ bg: 'delete_press' }}
        colorScheme="pink"
      />
    </>
  );
}
