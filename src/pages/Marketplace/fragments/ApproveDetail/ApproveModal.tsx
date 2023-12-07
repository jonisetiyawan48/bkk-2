import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
  Center,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import ApproveVector from './ApproveVector';
import { approveTransaction } from '../../api/apihandler';
import { fetchTrans } from '../../Sections/ListSection';

export default function ApproveModal({ isOpen, onClose, transactionId }: any) {
  const toast = useToast();

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="3xl" py={8}>
        <ModalBody alignItems="center" textAlign="center">
          <Center>
            <Icon
              width="201"
              height="200"
              viewBox="0 0 201 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ApproveVector />
            </Icon>
          </Center>
          <Text as="h3" fontSize={23} fontWeight={600}>
            Setujui transaksi?
          </Text>
          <Text as="h6" fontSize={16} fontWeight={400}>
            Apa anda yakin approve transaksi ini?
          </Text>
        </ModalBody>
        <Formik
          initialValues={{
            param: transactionId,
          }}
          onSubmit={async (values, actions) => {
            const val = await approveTransaction(values.param);

            if (val.status != 'success') {
              toast({
                title: `Error ${val?.code ?? 500}`,
                description: val?.message ?? "Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!",
                status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
                position: "bottom-right",
                variant: "left-accent",
                isClosable: true,
              });
              return;
            }
            
            toast({
              title: 'Sukses di setujui.',
              status: "success",
              position: "bottom-right",
              variant: "left-accent",
              isClosable: true,
            });
            setTimeout(() => {
              onClose();
              fetchTrans();
            }, 100);
            return;
          }}
        >
          {(props) => (
            <Form>
              <ModalFooter justifyContent="center">
                <Button
                  variant="outline"
                  px="10%"
                  borderColor="teal_custom"
                  color="teal_custom"
                  mr={3}
                  onClick={onClose}
                  borderRadius="full"
                  fontWeight={500}
                >
                  Batal
                </Button>
                <Button
                  isLoading={props.isSubmitting}
                  type="submit"
                  px="10%"
                  borderRadius="full"
                  bg="teal_custom"
                  _hover={{ bg: 'teal_customdarker' }}
                  colorScheme="teal"
                >
                  Approve
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
