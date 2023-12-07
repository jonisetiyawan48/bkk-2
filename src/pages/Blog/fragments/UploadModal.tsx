import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Box,
  Text,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Form, Field, Formik } from 'formik';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadComponent from '../../../components/UploadComponent';
import { postBlog } from '../api/apihandler';
import { reloadBlog } from '../Sections/BlogsSection';

export default function UploadModal({ isOpen, onOpen, onClose, reload }: any) {
  
  const [fetchCondition, setCondition] = useState('');
  const [message, setMessage] = useState('');

  const postHandler = async (values: any, actions: any) => {
    let run = await postBlog(values);

    setCondition(run.status);
    setMessage(run.message);

    if (run.status === 'success') {
      actions.resetForm();
      setTimeout(() => onClose(), 500);
      setTimeout(() => reloadBlog(), 1000);
      return;
    }
    return;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
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
              image: null,
              blogTitle: '',
              description: '',
            }}
            onSubmit={async (values, actions) => {
              await postHandler(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Box mt={4}>
                  <UploadComponent name="image" setFieldValue={props.setFieldValue} />
                </Box>
                <Field name="blogTitle">
                  {({ field, form }: any) => (
                    <FormControl
                      my={2}
                      isInvalid={
                        form.errors.blogTitle && form.touched.blogTitle
                      }
                    >
                      <Input
                        {...field}
                        id="blogTitle"
                        type="text"
                        placeholder="Judul"
                        borderRadius="20px"
                        focusBorderColor="red_darker"
                      />
                      <FormErrorMessage>
                        {form.errors.blogTitle}
                      </FormErrorMessage>
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
                        placeholder="Caption/description"
                        borderRadius="20px"
                        focusBorderColor="red_darker"
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <ModalFooter>
                  <Button
                    variant="outline"
                    borderColor="teal_custom"
                    mr={3}
                    fontWeight={500}
                    borderRadius="full"
                    color="teal_custom"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    isLoading={props.isSubmitting}
                    type="submit"
                    borderColor="teal_custom"
                    mr={3}
                    fontWeight={500}
                    borderRadius="full"
                    bg="teal_custom"
                    colorScheme="teal"
                    _hover={{ bg: 'teal_customdarker' }}
                    _pressed={{ bg: 'teal_custompress' }}
                    color="white"
                  >
                    Posting
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
