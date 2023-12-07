import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  GridItem,
  Box,
  Container,
  FormControl,
  Input,
  Button,
  Heading,
  Textarea,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

import { Formik, Field, Form } from 'formik';

import { putUsers } from '../api/apihandler';
import { FetchMessageEdit } from '../../Pengajuan/BursaKerja/fragments/FetchMessage';

export default function EditModal({
  isOpen,
  onOpen,
  onClose,
  payload,
  reload,
}: any) {
  const [fetchCondition, setCondition] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const putHandler = async (values: any, actions: any) => {
    let val = await putUsers(payload.userId, values);
    
    if (val?.status != "success") {
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

    toast({
      description: "Data user telah diedit.",
      status: "success",
      position: "bottom-right",
      variant: "left-accent",
      isClosable: true,
    });
    setCondition(val.status);
    setMessage(val.message);

    actions.resetForm();
    setTimeout(() => onClose(), 500);
    setTimeout(() => reload(), 1000);
    return;
  };

  useEffect(() => {
    setCondition('');
    setMessage('');
  }, []);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size="xs"
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalBody p={8}>
          <Heading fontSize={20}>Edit user</Heading>
          <FetchMessageEdit condition={fetchCondition} message={message} />
          <Formik
            enableReinitialize
            initialValues={{
              name: payload.name
            }}
            onSubmit={async (values, actions) => {
              await putHandler(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Field name="name">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        my={4}
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Nama"
                        borderRadius="20px"
                        focusBorderColor="red_darker"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  variant="outline"
                  borderColor="put_bg"
                  fontWeight={500}
                  p={6}
                  borderRadius="full"
                  color="put_bg"
                  onClick={onClose}
                >
                  Batal
                </Button>
                <Button
                  ml={3}
                  type="submit"
                  isLoading={props.isSubmitting}
                  bg="put_bg"
                  _hover={{ bg: 'put_hover' }}
                  colorScheme="yellow"
                  color="white"
                  fontWeight={500}
                  p={6}
                  borderRadius="full"
                >
                  Simpan
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
