import React, { useEffect, useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  GridItem,
  Container,
  FormControl,
  Input,
  Button,
  Heading,
  FormErrorMessage,
  FormLabel,
  Select,
  useToast,
} from '@chakra-ui/react';
import { postTest } from '../api/apihandler';

import { Formik, Field, Form } from 'formik';
import { ValidateAlignmentDate, ValidateSubject, ValidateAgencyName, ValidateLocation } from './validator';
import { FetchMessagePost } from '../../TamuGuru/fragments/FetchMessages';

export default function ModalAddTest({ isOpen, onOpen, onClose, reload }: any) {
  const [fetchConditon, setCondition] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const postHandler = async (values: any, actions: any) => {
    let val = await postTest(values);
    
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
          <Heading fontSize={20}>Tambah Penyelarasan Kurikulum</Heading>
          <FetchMessagePost condition={fetchConditon} message={message} />
          <Formik
            initialValues={{
              alignmentDate: '',
              subject: '',
              agencyName: '',
              duration: {
                value: 1,
                period: 'week'
              },
              location: '',
            }}
            onSubmit={async (values, actions) => {
              await postHandler(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Container gridTemplateRows="repeat(2,1fr)" p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                    <Field name="alignmentDate" validate={ValidateAlignmentDate}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.alignmentDate && form.touched.alignmentDate
                          }
                        >
                          <FormLabel>Tanggal</FormLabel>
                          <Input
                            {...field}
                            id="alignmentDate"
                            type="date"
                            placeholder="Tanggal Kunjungan"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.alignmentDate}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="subject" validate={ValidateSubject}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.subject && form.touched.subject
                          }
                        >
                          <FormLabel>Subject</FormLabel>
                          <Input
                            {...field}
                            id="subject"
                            type="text"
                            placeholder="Subject"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.subject}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <GridItem colSpan={2} display={{base: "block", lg: "flex"}}>
                      <Field name="duration.value">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors['duration.value'] && form.touched['duration.value']}
                          >
                            <FormLabel>Durasi</FormLabel>
                            <Input
                              {...field}
                              id="duration.value"
                              type="number"
                              borderLeftRadius="20px"
                              borderRightRadius={{base: "20px", lg: "0"}}
                              focusBorderColor="red_darker"
                            />
                            <FormErrorMessage>{form.errors['duration.value']}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="duration.period">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors['duration.period'] && form.touched['duration.period']}
                            mt={{base: 2, lg: 0}}
                          >
                            <FormLabel display={{base: "none", lg: "block"}}>&nbsp;</FormLabel>
                            <Select 
                              variant='outline'
                              {...field}
                              id="duration.period"
                              borderLeftRadius={{base: "20px", lg: "0"}}
                              borderRightRadius="20px"
                              focusBorderColor="red_darker"
                            >
                              <option value='day'>Hari</option>
                              <option value='week'>Minggu</option>
                              <option value='month'>Bulan</option>
                            </Select>
                            <FormErrorMessage>{form.errors['duration.period']}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <Field name="agencyName" validate={ValidateAgencyName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.agencyName && form.touched.agencyName
                          }
                        >
                          <FormLabel>Nama Agency</FormLabel>
                          <Input
                            {...field}
                            id="agencyName"
                            type="text"
                            borderRadius="20px"
                            placeholder="Nama Agency"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.agencyName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="location" validate={ValidateLocation}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.location && form.touched.location
                          }
                        >
                          <FormLabel>Lokasi</FormLabel>
                          <Input
                            {...field}
                            id="location"
                            type="text"
                            borderRadius="20px"
                            placeholder="Lokasi"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.location}
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
