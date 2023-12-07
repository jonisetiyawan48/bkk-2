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

import { provinceData } from '../../../../../utils/provinceId';

import { Formik, Field, Form } from 'formik';

import { putIntern } from '../apihandler';
import { FetchMessagePost } from '../../../TamuGuru/fragments/FetchMessages';

export default function EditModal({
  isOpen,
  onOpen,
  onClose,
  reload,
  payload,
}: any) {
  const [fetchCondition, setCondition] = useState('');
  const [message, setMessage] = useState('');

  const putHandler = async (values: any, actions: any) => {
    let run = await putIntern(payload.submissionId, values);

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
      <ModalContent borderRadius="20px">
        <ModalBody p={8}>
          <Heading fontSize={20}>Tambah Magang</Heading>
          <FetchMessagePost condition={fetchCondition} message={message} />
          <Formik
            enableReinitialize
            initialValues={{
              apprenticeshipPlace: payload.apprenticeshipPlace,
              intershipDate: payload.intershipDate.split('T')[0],
              place: JSON.stringify(
                provinceData.filter(
                  (item) => item.provinceId === payload.provinceId
                )
              ),
              user: payload.user[0].name,
            }}
            onSubmit={async (values, actions) => {
              let payload = {
                apprenticeshipPlace: values.apprenticeshipPlace,
                intershipDate: values.intershipDate,
                place: values.place,
                user: [{ name: values.user }],
              };
              await putHandler(payload, actions);
            }}
          >
            {(props) => (
              <Form>
                <Container gridTemplateRows="repeat(2,1fr)" p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                    <Field name="apprenticeshipPlace">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.apprenticeshipPlace &&
                            form.touched.apprenticeshipPlace
                          }
                        >
                          <Input
                            {...field}
                            id="apprenticeshipPlace"
                            type="text"
                            placeholder="Tempat magang"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.apprenticeshipPlace}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="intershipDate">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.intershipDate &&
                            form.touched.intershipDate
                          }
                        >
                          <Input
                            {...field}
                            id="intershipDate"
                            type="date"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.intershipDate}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="place">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.place && form.touched.place}
                        >
                          <Select
                            {...field}
                            id="place"
                            type="text"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          >
                            <option value="" selected hidden>
                              Lokasi
                            </option>
                            {provinceData.map((item, index) => (
                              <option value={JSON.stringify(item)} key={index}>
                                {item.province}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors.place}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="user">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.user && form.touched.user}
                        >
                          <Input
                            {...field}
                            id="user"
                            type="text"
                            placeholder="Nama"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.user}
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
