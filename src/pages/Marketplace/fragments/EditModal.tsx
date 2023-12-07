import React, { useEffect, useState } from 'react';

import { useDropzone } from 'react-dropzone';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormControl,
  Input,
  Button,
  Textarea,
  FormErrorMessage,
  Text,
  Box,
  Select,
  useToast,
} from '@chakra-ui/react';

import { Formik, Field, Form } from 'formik';
import { putProducts } from '../api/apihandler';
import { FetchMessagePost } from '../../Pengajuan/BursaKerja/fragments/FetchMessage';
import { fetchMarketplace } from '../Sections/AddSection';
import UploadComponent from '../../../components/UploadComponent';
// import { FetchMessagePut } from '../../Pengajuan/TamuGuru/fragments/FetchMessages';

export default function EditModal({ isOpen, onOpen, onClose, payload, reload }: any) {
  const [fetchCondition, setCondition] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const putHandler = async (values: any, actions: any) => {
    let val = await putProducts(payload.productId, values);
    
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
      size="md"
    >
      <ModalOverlay />
      <ModalContent
        maxW={{ base: "87.5vw", sm: "xl" }}
        py={4}
        borderRadius="3xl"
      >
        <ModalBody>
          <FetchMessagePost condition={fetchCondition} message={message} />
          <Formik
            initialValues={{
              name: payload.name,
              price: payload.numericPrice,
              description: payload.description,
              status: payload.status,
            }}
            onSubmit={async (values, actions) => {
              await putHandler(values, actions)
            }}
          >
            {(props) => (
              <Form>
                <Box mt={4}>
                  <UploadComponent name="image" setFieldValue={props.setFieldValue} />
                </Box>
                <Field name="name">
                  {({ field, form }: any) => (
                    <FormControl
                      my={2}
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Nama barang"
                        borderRadius="20px"
                        focusBorderColor="red_darker"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="price">
                  {({ field, form }: any) => (
                    <FormControl
                      my={2}
                      isInvalid={form.errors.price && form.touched.price}
                    >
                      <Input
                        {...field}
                        id="price"
                        type="number"
                        placeholder="Harga barang"
                        borderRadius="20px"
                        focusBorderColor="red_darker"
                      />
                      <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description">
                  {({ field, form }: any) => (
                    <FormControl
                      my={2}
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                    >
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
                
                <Field name="status">
                  {({ field, form }: any) => (
                    <FormControl
                      my={2}
                      isInvalid={form.errors.status && form.touched.status}
                    >
                      <Select
                        {...field}
                        id="status"
                        type="text"
                        borderRadius="20px"
                        focusBorderColor="red_darker"
                      >
                        <option value="" disabled>
                          Status
                        </option>
                        <option value="available">Tersedia</option>
                        <option value="empty">Kosong</option>
                        <option value="hide">Tersembunyi</option>
                      </Select>
                      <FormErrorMessage>{form.errors.status}</FormErrorMessage>
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
                  color='white'
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
