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
} from '@chakra-ui/react';

import { postInd } from './apihandler';

import { FetchMessagePost } from '../../BursaKerja/fragments/FetchMessage';
import { Field, Form, Formik } from 'formik';
import { ValidateTeacher, ValidateVisitDate } from '../../TamuGuru/fragments/validator';
import { ValidateAgency, ValidateIn, ValidateOut, ValidateStudents } from './validator';

export default function AddModal({ isOpen, onOpen, onClose, reload }: any) {
  const [fetchConditon, setCondition] = useState('');
  const [message, setMessage] = useState('');

  const postHandler = async (values: any, actions: any) => {
    let run = await postInd(values);

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
      size="xl"
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalBody p={8}>
          <Heading fontSize={20}>Tambah Kunjungan Industri</Heading>
          <FetchMessagePost condition={fetchConditon} message={message} />
          <Formik
            initialValues={{
              agencyName: '',
              visitDate: '',
              in: '',
              out: '',
              numberOfTeachers: '',
              numberOfStudents: '',
            }}
            onSubmit={async (values, actions) => {
              await postHandler(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Container gridTemplateRows="repeat(2,1fr)" p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                    <Field name="visitDate" validate={ValidateVisitDate}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.visitDate && form.touched.visitDate
                          }
                        >
                          <Input
                            {...field}
                            id="visitDate"
                            type="date"
                            placeholder="Tanggal Kunjungan"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.visitDate}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="agencyName" validate={ValidateAgency}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.agencyName && form.touched.agencyName
                          }
                        >
                          <Input
                            {...field}
                            id="agencyName"
                            type="text"
                            placeholder="Nama Instansi"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.agencyName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="in" validate={ValidateIn}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.in && form.touched.in}
                        >
                          <FormLabel>Jam Masuk</FormLabel>
                          <Input
                            {...field}
                            id="in"
                            type="time"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>{form.errors.in}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="out" validate={ValidateOut}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.out && form.touched.out}
                        >
                          <FormLabel>Jam Keluar</FormLabel>
                          <Input
                            {...field}
                            id="out"
                            type="time"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>{form.errors.out}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="numberOfTeachers" validate={ValidateTeacher}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.numberOfTeachers && form.touched.numberOfTeachers
                          }
                        >
                          <Input
                            {...field}
                            id="numberOfTeachers"
                            type="number"
                            placeholder="Jumlah Guru"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.numberOfTeachers}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="numberOfStudents" validate={ValidateStudents}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.numberOfStudents && form.touched.numberOfStudents
                          }
                        >
                          <Input
                            {...field}
                            id="numberOfStudents"
                            type="number"
                            placeholder="Jumlah Siswa"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.numberOfStudents}
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
