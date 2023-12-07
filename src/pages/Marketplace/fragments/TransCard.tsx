import { Box, Image, VStack, Text, Button, HStack } from '@chakra-ui/react';
import { USER_ROLE } from '../../../utils/constants';
import React from 'react';
import ApproveButton from './ApproveDetail/ApproveButton';
import DetailButton from './ApproveDetail/DetailButton';
import { checkRole } from '../../../utils/helpers/checkRole';

export default function TransCard({
  productName,
  productPrice,
  productImage,
  invoice,
  totalProductPrice,
  amount,
  address,
  district,
  phoneNumber,
  createdAt,
  approve,
  agency,
  transactionId,
}: any) {
  const itemProps = {
    name: productName,
    price: productPrice,
    invoice: invoice,
    total: totalProductPrice,
    amount: amount,
    address: address,
    city: district,
    agency: agency,
    tel: phoneNumber,
    date: createdAt,
  };

  return (
    <Box
      my={4}
      w="100%"
      bg="white"
      px={10}
      py={5}
      borderRadius="20px"
      display="flex"
      flexDir="row"
      gap={10}
      alignItems="center"
    >
      {productImage ? (
        <Image
          borderRadius="5px"
          w={32}
          maxH={'200px'}
          objectFit="cover"
          src={productImage}
        />
      ) : (
        <Box
          display="flex"
          borderRadius="3xl"
          w={32}
          h={32}
          textAlign="center"
          alignItems="center"
          justifyContent="center"
        >
          No Image
        </Box>
      )}
      <VStack alignItems="start">
        <Text as="h6" fontSize={25} fontWeight="bold">
          {productName}
        </Text>
        <Text as="p" fontWeight={300} color="red">
          {invoice}
        </Text>
        <HStack>
          <Text as="h6" fontSize={16} fontWeight="medium">
            {productPrice} x {amount}
          </Text>
          <Text
            as="h6"
            fontSize={16}
            fontWeight="medium"
            color={approve ? 'teal_custom' : 'orange'}
          >
            {approve ? 'Dikonfirmasi' : 'Menunggu'}
          </Text>
        </HStack>
        <HStack>
          <DetailButton props={itemProps} />
          {checkRole(['7', '5']) && <ApproveButton params={transactionId} />}
        </HStack>
      </VStack>
    </Box>
  );
}
