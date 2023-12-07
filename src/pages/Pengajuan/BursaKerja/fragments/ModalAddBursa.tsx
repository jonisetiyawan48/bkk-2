import React, { useEffect, useState } from "react";
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
  useToast,
  GridItem,
  FormLabel,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";

import { Formik, Field, Form } from "formik";
import {
  ValidateCondition,
  ValidateDate,
  ValidateDescription,
  ValidateJobtitle,
} from "./validator";
import { postJobs } from "./apihandler";
import { FetchMessagePost } from "./FetchMessage";
import { useDropzone } from "react-dropzone";
import UploadComponent from "../../../../components/UploadComponent";

export default function ModalBursa({ isOpen, onOpen, onClose, reload }: any) {
  const [fetchCondition, setCondition] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const postHandler = async (values: any, actions: any) => {
    let val = await postJobs(values);

    if (val?.status != "success") {
      toast({
        title: `Error ${val?.code ?? 500}`,
        description:
          val.message ??
          "Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!",
        status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    setCondition(val.status);
    setMessage(val.message);

    actions.resetForm();
    setTimeout(() => onClose(), 500);
    setTimeout(() => reload(), 1000);
    return;
  };

  useEffect(() => {
    setCondition("");
    setMessage("");
  }, []);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent maxW={{ base: "87.5vw", sm: "xl" }} borderRadius="3xl" maxH={{ base: "90vh", sm: "calc(100% - 7.5rem)" }}>
        <Formik
          enableReinitialize
          initialValues={{
            jobTitle: "",
            date: "",
            description: "",
            condition: "",
            image: null
          }}
          onSubmit={async (values, actions) => {
            await postHandler(values, actions);
          }}
        >
          {(props) => (
            <ModalBody>
              <Box my={4}>
                <Heading fontSize={20}>Tambah Bursa Kerja</Heading>
                <FetchMessagePost condition={fetchCondition} message={message} />
                <Form>
                  <Box mt={4}>
                    <UploadComponent
                      name="image"
                      setFieldValue={props.setFieldValue}
                    />
                  </Box>
                  <Container gridTemplateRows="repeat(2,1fr)" p={0}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <Field name="jobTitle" validate={ValidateJobtitle}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.jobTitle && form.touched.jobTitle
                              }
                            >
                              <FormLabel>Role Pekerjaan</FormLabel>
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
                      </GridItem>
                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <Field name="date" validate={ValidateDate}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={form.errors.date && form.touched.date}
                            >
                              <FormLabel>Tanggal</FormLabel>
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
                      </GridItem>
                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <Field
                          name="description"
                          validate={ValidateDescription}
                        >
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.description &&
                                form.touched.description
                              }
                            >
                              <FormLabel>Deskripsi Pekerjaan</FormLabel>
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
                      </GridItem>
                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <Field name="condition" validate={ValidateCondition}>
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.condition && form.touched.condition
                              }
                            >
                              <FormLabel>Persyaratan</FormLabel>
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
                      </GridItem>
                    </Grid>
                  </Container>
                  <Flex gap={3} justifyContent="flex-end" mt={5}>
                    <Button
                      variant="outline"
                      px="10%"
                      borderColor="teal_custom"
                      color="teal_custom"
                      borderRadius="full"
                      fontWeight={500}
                      minW="120px"
                      onClick={onClose}
                    >
                      Batal
                    </Button>
                    <Button
                      isLoading={props.isSubmitting}
                      type="submit"
                      px="10%"
                      borderRadius="full"
                      bg="teal_custom"
                      _hover={{ bg: "teal_customdarker" }}
                      colorScheme="teal"
                      fontWeight={500}
                      minW="120px"
                    >
                      Tambah
                    </Button>
                  </Flex>
                </Form>
              </Box>
            </ModalBody>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
