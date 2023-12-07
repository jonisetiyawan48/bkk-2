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
  FormLabel,
  useToast,
  Flex,
} from '@chakra-ui/react';

import { Formik, Field, Form } from 'formik';

import {
  ValidateName,
} from './validator';
import { putRequestLists } from './apihandler';
import { FetchMessageEdit } from './FetchMessage';

export default function ModalEdit({
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
    let val = await putRequestLists(payload.submissionId, values);
    
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
    setTimeout(() => reload(), 1000);
    return;
  };

  useEffect(() => {
    setCondition('')
    setMessage('')
  },[])

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent maxW={{ base: "87.5vw", sm: "xl" }} py={4} borderRadius="3xl">
        <ModalBody>
          <Heading fontSize={20}>Edit Data User</Heading>
          <FetchMessageEdit condition={fetchCondition} message={message} />
          <Formik
            enableReinitialize
            initialValues={{
              studentId: payload.studentId,
              name: payload.name,
              agencyName: payload.agencyName,
              description: payload.description,
            }}
            onSubmit={async (values, actions) => {
              await putHandler(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Container gridTemplateRows="repeat(2,1fr)" p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                    <GridItem colSpan={{ base: 2, md: 1 }}>
                      <Field name="name" validate={ValidateName}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel>Nama Lengkap</FormLabel>
                            <Input
                              {...field}
                              id="name"
                              type="text"
                              placeholder="Nama"
                              borderRadius="20px"
                              focusBorderColor="red_darker"
                              required
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={{ base: 2, md: 1 }}>
                      <Field name="agencyName">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel>Asal Instansi</FormLabel>
                            <Input
                              {...field}
                              id="agencyName"
                              type="text"
                              placeholder="Asal Instansi"
                              borderRadius="20px"
                              focusBorderColor="red_darker"
                              disabled
                            />
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Field name="description">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.description &&
                              form.touched.description
                            }
                          >
                            <FormLabel>Deskripsi</FormLabel>
                            <Textarea
                              {...field}
                              id="description"
                              type="text"
                              placeholder="Deskripsi"
                              borderRadius="20px"
                              focusBorderColor="red_darker"
                            />
                            <FormErrorMessage>
                              {form.errors.description}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  </Grid>
                </Container>
                <Flex gap={3} justifyContent="flex-end" mt={5}>
                  <Button
                    variant="outline"
                    px="10%"
                    borderColor="put_bg"
                    color="put_bg"
                    borderRadius="full"
                    fontWeight={500}
                    minW="120px"
                    onClick={onClose}
                  >
                    Batal
                  </Button>
                  <Button
                    isLoading={props.isSubmitting}
                    type="submit"
                    px="10%"
                    borderRadius="full"
                    bg="put_bg"
                    _hover={{ bg: 'put_hover' }}
                    colorScheme="yellow"
                    fontWeight={500}
                    minW="120px"
                    color='white'
                  >
                    Simpan
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
