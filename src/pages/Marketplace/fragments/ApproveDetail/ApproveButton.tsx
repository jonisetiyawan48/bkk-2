import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ApproveModal from './ApproveModal';

export default function ApproveButton({ params }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ApproveModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        transactionId={params}
      />
      <Button
        gap={3}
        p={6}
        borderRadius="full"
        bg="teal_custom"
        _hover={{ bg: 'teal_custom' }}
        colorScheme="teal"
        fontWeight={500}
        onClick={onOpen}
      >
        Konfirmasi
      </Button>
    </>
  );
}
