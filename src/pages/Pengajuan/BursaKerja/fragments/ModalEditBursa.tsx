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
} from '@chakra-ui/react';

import { Formik, Field, Form } from 'formik';

import {
  ValidateCondition,
  ValidateDate,
  ValidateDescription,
  ValidateJobtitle,
} from './validator';
import { putJobs } from './apihandler';
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

  const putHandler = async (values: any, actions: any) => {
    let run = await putJobs(payload.submissionId, values);
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
          <Heading fontSize={20}>Edit Bursa Kerja</Heading>
          <FetchMessageEdit condition={fetchCondition} message={message} />
          <Formik
            enableReinitialize
            initialValues={{
              jobTitle: payload.jobTitle,
              date: payload.date.split('T')[0],
              description: payload.description,
              condition: payload.condition,
            }}
            onSubmit={async (values, actions) => {
              await putHandler(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Container gridTemplateRows="repeat(2,1fr)" p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                    <Field name="jobTitle" validate={ValidateJobtitle}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.jobTitle && form.touched.jobTitle
                          }
                        >
                          <Input
                            {...field}
                            id="jobTitle"
                            type="text"
                            placeholder="Role Pekerjaan"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.jobTitle}
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
                    <Field name="description" validate={ValidateDescription}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.description && form.touched.description
                          }
                        >
                          <Textarea
                            {...field}
                            id="description"
                            type="text"
                            placeholder="Deskripsi Pekerjaan"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="condition" validate={ValidateCondition}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.condition && form.touched.condition
                          }
                        >
                          <Textarea
                            {...field}
                            id="condition"
                            type="text"
                            placeholder="Persyaratan"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.condition}
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
