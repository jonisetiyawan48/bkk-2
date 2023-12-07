import { IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Trash2 } from 'react-feather';
import DeleteModal from './DeleteModal';

export default function DeleteButton({ param, reload }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <DeleteModal
        payload={param}
        reload={reload}
        onClose={onClose}
        isOpen={isOpen}
      />
      <IconButton
        // onClick={onOpen}
        aria-label="delete"
        icon={<Trash2 size={28} />}
        borderRadius="2xl"
        h={12}
        w={12}
        bg="delete_bg"
        _hover={{ bg: 'delete_hover' }}
        _pressed={{ bg: 'delete_press' }}
        colorScheme="pink"
        onClick={onOpen}
      />
    </>
  );
}
