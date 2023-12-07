import { useDisclosure, IconButton } from '@chakra-ui/react';
import { Trash2 } from 'react-feather';
import ModalHapusBursa from '../ModalHapusBursa';

export default function Delete({ payload, reload, page }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ModalHapusBursa
        isOpen={isOpen}
        onClose={onClose}
        payload={payload}
        page={page}
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
