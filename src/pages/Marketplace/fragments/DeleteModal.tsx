import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Center,
  Icon,
  useToast,
} from '@chakra-ui/react';
import DeleteVector from '../../../components/DeleteVector';
import { deleteProducts } from '../api/apihandler';
import { Formik, Form } from 'formik';
import { FetchMessageDelete } from '../../Pengajuan/BursaKerja/fragments/FetchMessage';
import { fetchMarketplace } from '../Sections/AddSection';
// import { FetchMessageDelete } from './FetchMessage';

export default function DeleteModal({
  isOpen,
  onOpen,
  onClose,
  payload,
  reload,
}: any) {
  const [fetchCondition, setCondition] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  useEffect(() => {
    setCondition('');
    setMessage('');
  }, []);

  const deleteHandler = async (values: any, actions: any) => {
    let val = await deleteProducts(payload);
    
    if (val.status != 'success') {
      toast({
        title: `Error ${val?.code ?? 500}`,
        description: val?.message ?? 'Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!',
        status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    setCondition(val.status);
    setMessage(val.message);

    toast({
      description: val.message,
      status: "success",
      position: "bottom-right",
      variant: "left-accent",
      isClosable: true,
    });
    actions.resetForm();
    setTimeout(() => onClose(), 500);
    setTimeout(() => fetchMarketplace(), 1000);
    return;
  };

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
              <DeleteVector />
            </Icon>
          </Center>
          <Text as="h3" fontSize={23} fontWeight={600}>
            Hapus Produk?
          </Text>
          <FetchMessageDelete condition={fetchCondition} message={message} />
          <Text as="h6" fontSize={16} fontWeight={400}>
            Apa anda yakin menghapus data produk ini?
          </Text>
        </ModalBody>
        <Formik
          initialValues={{
            param: payload,
          }}
          onSubmit={async (values, actions) => {
            await deleteHandler(values.param, actions);
          }}
        >
          {(props) => (
            <Form>
              <ModalFooter justifyContent="center">
                <Button
                  variant="outline"
                  px="10%"
                  colorScheme="red"
                  mr={3}
                  onClick={onClose}
                  borderRadius="full"
                >
                  Batal
                </Button>
                <Button
                  isLoading={props.isSubmitting}
                  type="submit"
                  px="10%"
                  borderRadius="full"
                  colorScheme="red"
                  shadow="0 0 20px rgba(231, 0, 0, 20%)"
                >
                  Hapus
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
