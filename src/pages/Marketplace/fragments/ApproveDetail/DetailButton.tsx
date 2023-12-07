import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import DetailModal from './DetailModal';

export default function DetailButton(props:any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <DetailModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} props={props}/>
      <Button
        type="submit"
        bg="#FFB573"
        _hover={{ bg: 'put_hover' }}
        colorScheme="yellow"
        color="white"
        fontWeight={500}
        p={6}
        borderRadius="full"
        onClick={onOpen}
      >
        Detail Transaksi
      </Button>
    </>
  );
}
