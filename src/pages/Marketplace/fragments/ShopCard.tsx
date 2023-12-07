import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';

import { Formik, Field, Form, FormikProps } from 'formik';

import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'react-feather';
import { postCart } from '../api/apihandler';

export default function ShopCard({ name, price, imageUrl, productId }: any) {
  const toast = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    props: FormikProps<{
      productId: any;
      amount: number;
    }>
  ) => {
    props.setFieldValue('amount', e.target.value)
  };

  const addCounter = (
    props: FormikProps<{
      productId: any;
      amount: number;
    }>
  ) => {
    props.setFieldValue('amount', props.values.amount + 1)
  };

  const decreaseCounter = (
    props: FormikProps<{
      productId: any;
      amount: number;
    }>
  ) => {
    if (props.values.amount > 0) {
      props.setFieldValue('amount', props.values.amount -1)
    }
  };

  const amountValidator = (amount: number) => {
    let error;
    if (amount === 0) return (error = 'Ammount must be more than 0');
    return;
  };

  return (
    <Box bgColor="white" p={4} borderRadius="20px"  py={8} px={6}>
      <Center>
        <Image h={28} src={imageUrl} />
      </Center>
      <Box my={4}>
        <Text as="h6">{name}</Text>
        <Text as="h6" color="red_darker">
          {price}
        </Text>
      </Box>
      {/* <Formik
        initialValues={{
          productId: productId,
          amount: 0,
        }}
        onSubmit={async (values, actions) => {
          let res = await postCart(values);

          if (res.status === 'success') {
            toast({
              title: 'sukses ditambahkan',
              status: 'success',
              isClosable: true,
            });
          } else {
            toast({ title: 'Error', status: 'error', isClosable: true });
          }
        }}
      >
        {(props) => (
          <Form>
            <Flex gap={2}>
              <Button
                borderRadius="full"
                bg="grey_bg"
                color="red_lighter"
                onClick={() => decreaseCounter(props)}
              >
                -
              </Button>
              <Field name="amount">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.amount}>
                    <Input
                      {...field}
                      id="amount"
                      borderRadius="full"
                      type="number"
                      bg="grey_bg"
                      borderColor="grey_bg"
                      onChange={(e) => {
                        handleInputChange(e, props);
                      }}
                    />
                    <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                borderRadius="full"
                bg="grey_bg"
                color="red_lighter"
                onClick={() => addCounter(props)}
              >
                +
              </Button>
              <Button
                type="submit"
                p="11px"
                color="white"
                bg="red_lighter"
                colorScheme="red"
                borderRadius="15px"
                isLoading={props.isSubmitting}
              >
                <ShoppingCart />
              </Button>
            </Flex>
          </Form>
        )}
      </Formik> */}
    </Box>
  );
}
