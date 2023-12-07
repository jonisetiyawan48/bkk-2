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
  FormErrorMessage,
} from '@chakra-ui/react';

import { Formik, Field, Form } from 'formik';

import { postUsers } from '../api/apihandler';
import { FetchMessagePost } from '../../Pengajuan/BursaKerja/fragments/FetchMessage';
import { fetchStudents } from '../Siswa';
import { fetchTeachers } from '../Guru';
import { useLocation, useParams } from 'react-router-dom';

export default function AddModal({ isOpen, onOpen, onClose, role }: any) {
  const location = useLocation();

  const [fetchCondition, setCondition] = useState('');
  const [message, setMessage] = useState('');

  let currPageRole: number;

  switch (location.pathname.split('/')[3]) {
    case 'guru':
      currPageRole = 2;
      break;
    case 'siswa':
      currPageRole = 3;
      break;
  }

  const postHandler = async (values: any, actions: any) => {    
    let run = await postUsers(values);

    setCondition(run.status);
    setMessage(run.message);

    if (run.status === 'success') {
      actions.resetForm();
      setTimeout(() => onClose(), 500);
      setTimeout(
        () => (currPageRole === 2 ? fetchTeachers() : fetchStudents()),
        1000
      );
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
          <Heading fontSize={20}>Tambah User</Heading>
          <FetchMessagePost condition={fetchCondition} message={message} />
          <Formik
            enableReinitialize
            initialValues={{
              name: '',
              email: '',
              password: '',
              roles: `${role}`,
            }}
            onSubmit={async (values, actions) => {
              await postHandler(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Container gridTemplateRows="repeat(2,1fr)" p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                    <Field name="name">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <Input
                            {...field}
                            id="name"
                            type="text"
                            placeholder="Nama"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            borderRadius="20px"
                            placeholder="Email"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="password"
                            borderRadius="20px"
                            focusBorderColor="red_darker"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
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
