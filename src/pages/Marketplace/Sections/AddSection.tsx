import {
  Button,
  Container,
  Flex,
  Heading,
  Progress,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'react-feather';
import { fetchProducts } from '../api/apihandler';
import AddModal from '../fragments/AddModal';
import EDCard from '../fragments/EDCard';

export let fetchMarketplace:Function;

export default function AddSection() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  fetchMarketplace = async () => {
    await fetchProducts()
      .then((data) => setData(data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchMarketplace();
  }, []);

  if (loading) return <Progress colorScheme="green" isIndeterminate size="xs"/>;

  return (
    <>
      <AddModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex 
        flexDirection={{ base: "column", sm: "row" }}
        mb={10} 
        justifyContent="space-between" 
        gap={3}
      >
        <Heading>List barang</Heading>
        <Button
          gap={3}
          p={6}
          borderRadius="20px"
          bg="red_darker"
          color="white"
          fontWeight={500}
          colorScheme="red"
          onClick={onOpen}
        >
          <PlusCircle />
          Tambah Barang
        </Button>
      </Flex>
      {data.length >= 1 ? (
        data.map((item:any, index) => <EDCard {...item} key={index}/>)
      ) : (
        <h1>Belum ada data...</h1>
      )}
    </>
  );
}
