import { Box, Image, VStack, Text, HStack, IconButton, Flex } from '@chakra-ui/react';
import { Edit2, Trash2 } from 'react-feather';
import React from 'react';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

export default function EDCard({ name, price, imageUrl, description, status, reload, productId, numericPrice }: any) {
  const EditProps = {
    name:name,
    price:price,
    description:description,
    status:status,
    productId:productId,
    numericPrice:numericPrice
  }

  return (
    <Box
      my={4}
      w="100%"
      bg="white"
      px={7}
      py={5}
      borderRadius="20px"
      display="flex"
      flexDir="row"
      justifyContent="space-between"
      gap={5}
    >
      {imageUrl ? (
        <Image
          borderRadius="5px"
          w={32}
          maxH={'200px'}
          objectFit="cover"
          src={imageUrl}
        />
      ) : (
        <Box
          display="flex"
          borderRadius="3xl"
          w={32}
          h={32}
          textAlign="center"
          alignItems='center'
          justifyContent='center'
        >
          No Image
        </Box>
      )}
      <Flex 
        flexDir={{base: "column", sm: "row"}} 
        gap={5} 
        w="100%"
        justifyContent="space-between"
      >
        <VStack justifyContent="center" alignItems="start">
          <Text as="h6" fontSize={18} fontWeight="500">
            {name}
          </Text>
          <Text as="h6" fontSize={14} fontWeight="medium">
            {price}
          </Text>
        </VStack>
        <HStack justifyContent="flex-end">
          <DeleteButton param={productId} reload={reload}/>
          <EditButton payload={EditProps} reload={reload} />
        </HStack>
      </Flex>
    </Box>
  );
}
