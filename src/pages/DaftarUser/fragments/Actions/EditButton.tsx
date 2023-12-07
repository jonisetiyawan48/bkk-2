import React from 'react';
import { useDisclosure, IconButton } from '@chakra-ui/react';
import { Edit2 } from 'react-feather';
import EditModal from '../EditModal';

export default function EditButton({ payload, reload }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        payload={payload}
        reload={reload}
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
      >
        Edit
      </IconButton>
    </>
  );
}
