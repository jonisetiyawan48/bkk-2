import { IconButton, useDisclosure } from '@chakra-ui/react';
import { Edit2 } from 'react-feather';
import EditModal from './EditModal';

export default function EditButton({payload, reload}:any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <EditModal onClose={onClose} isOpen={isOpen} payload={payload} reload={reload}/>
      <IconButton
        // onClick={onOpen}
        aria-label="edit"
        icon={<Edit2 size={28} />}
        borderRadius="2xl"
        h={12}
        w={12}
        bg="edit_bg"
        _hover={{ bg: 'edit_hover' }}
        _pressed={{ bg: 'edit_press' }}
        colorScheme="blue"
        onClick={onOpen}
      >
        Edit
      </IconButton>
    </>
  );
}
