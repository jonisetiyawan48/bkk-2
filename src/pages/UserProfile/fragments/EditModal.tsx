import React, { useState } from 'react';
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  UseDisclosureReturn,
  Text,
  FormLabel,
  Box,
  FormControl,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { Formik, Field, Form } from 'formik';
import { getLocalStorage } from '../../../utils/helpers/localstorage';
import { LOCAL_STORAGE_USER } from '../../../utils/constants';
import { putCurrentUser } from '../api/apihandler';
import { loadUser } from '../UserProfile';
import UploadComponent from '../../../components/UploadComponent';

type userType = {
  name: string;
  address: string;
  agency: string;
  phoneNumber:string;
};

export default function EditModal({
  disclosure,
  props,
}: {
  props: userType;
  disclosure: UseDisclosureReturn;
}) {

  const { isOpen, onOpen, onClose } = disclosure;
  const [fetchCondition, setCondition] = useState('');
  const [message, setMessage] = useState('');

  const editHandle = async (values: any, actions: any) => {
    let run = await putCurrentUser(values);

    setCondition(run.status);
    setMessage(run.message);

    if (run.status === 'success') {
      actions.resetForm();
      setTimeout(() => onClose(), 500);
      setTimeout(() => loadUser(), 1000);
      return;
    }
    return;
  };

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
      <ModalContent
        maxW={{ base: "87.5vw", sm: "xl" }}
        py={4}
        borderRadius="3xl"
      >
        <ModalBody>
          <Formik
            initialValues={{
              name: props.name,
              address: props.address ? props.address : '',
              agency: props.agency ? props.agency : '',
              phoneNumber: props.phoneNumber ? props.phoneNumber : '',

            }}
            onSubmit={async (values, actions) => {
              await editHandle(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Box mt={4}>
                  <UploadComponent name="imageUser" setFieldValue={props.setFieldValue} />
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
                        placeholder="Nama"
                        type="text"
                        rounded="full"
                        variant="filled"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="address">
                  {({ field, form }: any) => (
                    <FormControl
                      my={2}
                      isInvalid={form.errors.address && form.touched.address}
                    >
                      <Input
                        {...field}
                        id="address"
                        placeholder="Alamat"
                        type="text"
                        rounded="full"
                        variant="filled"
                      />
                      <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="agency">
                  {({ field, form }: any) => (
                    <FormControl
                      my={2}
                      isInvalid={form.errors.nagency && form.touched.nagency}
                    >
                      <Input
                        {...field}
                        id="agency"
                        placeholder="Instansi"
                        type="text"
                        rounded="full"
                        variant="filled"
                      />
                      <FormErrorMessage>{form.errors.agency}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="phoneNumber">
                  {({ field, form }: any) => (
                    <FormControl
                      my={2}
                      isInvalid={form.errors.nphoneNumber && form.touched.nphoneNumber}
                    >
                      <Input
                        {...field}
                        id="phoneNumber"
                        placeholder="Nomor Telp"
                        type="number"
                        rounded="full"
                        variant="filled"
                      />
                      <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
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
