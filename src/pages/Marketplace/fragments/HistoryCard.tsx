import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import { isoToString } from '../../../utils/helpers/isoDateFormatter';
import { checkOutItem, deleteCart } from '../api/apihandler';
import { fetchCartData } from '../Sections/CartSection';

export default function HistoryCard({
  productImage,
  productName,
  invoice,
  productPrice,
  amount,
  createdAt,
  cartId,
}: any) {
  const toast = useToast();
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
      justifyContent="space-between"
    >
      <Box display="flex" gap={6}>
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
          <Text as="h6" fontSize={14} fontWeight="normal" color="grey">
            {isoToString(createdAt)}
          </Text>
          <Text as="h6" fontSize={25} fontWeight="bold">
            {productName}
          </Text>

          <Text as="p" fontWeight={300} color="red">
            {invoice}
          </Text>
          <Text as="h6" fontSize={16} fontWeight="medium">
            {productPrice} x {amount}
          </Text>
        </VStack>
      </Box>
      <VStack>
        <Button
          borderRadius="full"
          fontWeight={500}
          colorScheme="teal"
          bg="teal_custom"
          onClick={() => {
            checkOutItem(cartId).then((val) => {
              if (val?.status != "success") {
                toast({
                  title: `Error ${val?.code ?? 500}`,
                  description: val?.message ?? "Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!",
                  status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
                  position: "bottom-right",
                  variant: "left-accent",
                  isClosable: true
                });
                return;
              } 

              toast({
                description: "Sukses checkout.",
                status: "success",
                position: "bottom-right",
                variant: "left-accent",
                isClosable: true,
              });
              return;
            });
          }}
        >
          Checkout
        </Button>
        <Button borderRadius="full" fontWeight={500} colorScheme="red" bg="red"
          onClick={() => {
            deleteCart(cartId).then((val) => {
              if (val.status != 'success') {
                toast({ 
                  title: `Error ${val?.code ?? 500}`,
                  description: val?.message ?? "Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!",
                  status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
                  position: "bottom-right",
                  variant: "left-accent",
                  isClosable: true                  
                });
                return;
              }
              
              toast({
                description: 'Sukses dihapus.',
                status: "success",
                position: "bottom-right",
                variant: "left-accent",
                isClosable: true,
              });
              return;
            })
            .then(() => fetchCartData())
          }}
        >
          Delete
        </Button>
      </VStack>
    </Box>
  );
}
