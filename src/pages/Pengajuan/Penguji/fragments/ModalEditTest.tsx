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
import { putTest } from '../api/apihandler';

import {
  ValidateIn,
  ValidateNecessity,
  ValidateOut,
  ValidateTeacher,
  ValidateVisitDate,
} from '../../TamuGuru/fragments/validator';

import { FetchMessageEdit } from '../../BursaKerja/fragments/FetchMessage';

export default function ModalEditTest({
  isOpen,
  onOpen,
  onClose,
  payload,
  reload,
}: any) {
  const [fetchConditon, setCondition] = useState('');
  const [message, setMessage] = useState('');

  const puthandler = async (values: any, actions: any) => {
    let run = await putTest(payload.submissionId, values);
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
      <ModalContent maxW={{ base: "87.5vw", sm: "xl" }} py={4} borderRadius="3xl">
        <ModalBody>
          <Heading fontSize={20}>Edit Guru Penguji</Heading>
          <FetchMessageEdit condition={fetchConditon} message={message} />
          <Formik
            initialValues={{
              visitDate: payload.visitDate.split('T')[0],
              necessity: payload.necessity,
              teacher: payload.teacher,
              in: payload.in,
              out: payload.out,
            }}
            onSubmit={async (values, actions) => {
              await puthandler(values, actions);
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
                    <Field name="necessity" validate={ValidateNecessity}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.necessity && form.touched.necessity
                          }
                        >
                          <Input
                            {...field}
                            id="necessity"
                            type="text"
                            placeholder="Keperluan"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.necessity}
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
                    <Field name="teacher" validate={ValidateTeacher}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.teacher && form.touched.teacher
                          }
                        >
                          <Input
                            {...field}
                            id="teacher"
                            type="number"
                            borderRadius="20px"
                            placeholder="Jumlah guru"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.teacher}
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
