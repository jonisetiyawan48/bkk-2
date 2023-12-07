import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  Container,
  FormControl,
  Input,
  Button,
  Heading,
  Textarea,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';

import { Formik, Field, Form } from 'formik';

import { postCerts } from './apihandler';
import { FetchMessagePost } from '../../BursaKerja/fragments/FetchMessage';
import { ValidateName } from '../../../Register/fragments/validator';
import {
  ValidateDate,
  ValidateGender,
  ValidateNisn,
  ValidatePhone,
  ValidateProgram,
  ValidateSchool,
  ValidateStatus,
} from './validator';

export default function AddModal({ isOpen, onOpen, onClose, reload }: any) {
  const [fetchCondition, setCondition] = useState('');
  const [message, setMessage] = useState('');

  const postHandler = async (values: any, actions: any) => {
    let run = await postCerts(values);

    setCondition(run.status);
    setMessage(run.message);

    if (run.status === 'success') {
      actions.resetForm();
      setTimeout(() => onClose(), 500);
      setTimeout(() => reload(), 1000);
      return;
    }
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
      size="xl"
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalBody p={8}>
          <Heading fontSize={20}>Tambah Sertifikasi</Heading>
          <FetchMessagePost condition={fetchCondition} message={message} />
          <Formik
            enableReinitialize
            initialValues={{
              name: '',
              gender: '',
              nisn: '',
              phone: '',
              school: '',
              program: '',
              date: '',
              status: '',
            }}
            onSubmit={async (values, actions) => {
              await postHandler(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Container gridTemplateRows="repeat(2,1fr)" p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                    <Field name="name" validate={ValidateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <Input
                            {...field}
                            id="name"
                            type="text"
                            placeholder="Name"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="date" validate={ValidateDate}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.date && form.touched.date}
                        >
                          <Input
                            {...field}
                            id="date"
                            type="date"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.date}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="gender" validate={ValidateGender}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.gender && form.touched.gender}
                        >
                          <Select
                            {...field}
                            id="gender"
                            type="text"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          >
                            <option value="" selected hidden>
                              Jenis Kelamin
                            </option>
                            <option value="M">Laki Laki</option>
                            <option value="F">Perempuan</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.gender}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phone" validate={ValidatePhone}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.phone && form.touched.phone}
                        >
                          <Input
                            {...field}
                            id="phone"
                            type="text"
                            placeholder="Nomor telepon"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.phone}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="nisn" validate={ValidateNisn}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.nisn && form.touched.nisn}
                        >
                          <Input
                            {...field}
                            id="nisn"
                            type="text"
                            placeholder="NISN"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.nisn}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="program" validate={ValidateProgram}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.program && form.touched.program
                          }
                        >
                          <Input
                            {...field}
                            id="program"
                            type="text"
                            placeholder="Jurusan"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.program}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="school" validate={ValidateSchool}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.school && form.touched.school}
                        >
                          <Input
                            {...field}
                            id="school"
                            type="text"
                            placeholder="Asal Sekolah"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.school}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="status" validate={ValidateStatus}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.status && form.touched.status}
                        >
                          <Select
                            {...field}
                            id="status"
                            type="text"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          >
                            <option value="" selected hidden>
                              Status
                            </option>

                            <option value="process">Proses</option>
                            <option value="cancel">Batal</option>
                            <option value="done">Done</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.status}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Grid>
                </Container>
                <Button
                  variant="outline"
                  borderColor="teal_custom"
                  fontWeight={500}
                  p={6}
                  borderRadius="full"
                  color="teal_custom"
                  onClick={onClose}
                >
                  Batal
                </Button>
                <Button
                  ml={3}
                  type="submit"
                  isLoading={props.isSubmitting}
                  bg="teal_custom"
                  _hover={{ bg: 'teal_custom' }}
                  colorScheme="teal"
                  fontWeight={500}
                  p={6}
                  borderRadius="full"
                >
                  Tambah
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
