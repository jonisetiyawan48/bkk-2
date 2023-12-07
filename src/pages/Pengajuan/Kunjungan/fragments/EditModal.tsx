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

import { Formik, Field, Form } from 'formik';

import { putInd } from './apihandler';
import { FetchMessageEdit } from '../../BursaKerja/fragments/FetchMessage';

import { FetchMessagePost } from '../../BursaKerja/fragments/FetchMessage';
import {
  ValidateTeacher,
  ValidateVisitDate,
} from '../../TamuGuru/fragments/validator';
import {
  ValidateAgency,
  ValidateIn,
  ValidateOut,
  ValidateStudents,
} from './validator';

export default function EditModal({
  isOpen,
  onOpen,
  onClose,
  payload,
  reload,
}: any) {
  const [fetchCondition, setCondition] = useState('');
  const [message, setMessage] = useState('');

  const putHandler = async (values: any, actions: any) => {
    let run = await putInd(payload.submissionId, values);
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
          <Heading fontSize={20}>Edit Kunjungan Industri</Heading>
          <FetchMessageEdit condition={fetchCondition} message={message} />
          <Formik
            initialValues={{
              agencyName: payload.agencyName,
              visitDate: payload.visitDate.split('T')[0],
              in: payload.in,
              out: payload.out,
              numberOfTeachers: payload.numberOfTeachers,
              numberOfStudents: payload.numberOfStudents,
            }}
            onSubmit={async (values, actions) => {
              await putHandler(values, actions);
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
                            form.errors.numberOfTeachers &&
                            form.touched.numberOfTeachers
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
                            form.errors.numberOfStudents &&
                            form.touched.numberOfStudents
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
