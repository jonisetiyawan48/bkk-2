import {
  Button,
  Flex,
  Heading,
  Progress,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'react-feather';
import { fetchTransaction } from '../api/apihandler';
import AddModal from '../fragments/AddModal';
import TransCard from '../fragments/TransCard';

export let fetchTrans:Function;

export default function ListSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  fetchTrans = async () => {
    setLoading(true)
    await fetchTransaction()
      .then((transaction) => setData(transaction))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrans();
  }, []);

  if (loading) return <Progress size="xs" isIndeterminate />;

  return (
    <>
      <Flex dir="row" mb={6} justifyContent="space-between" maxW="full">
        <Heading>List Transaksi</Heading>
      </Flex>
      {data.length >= 1 ? (
        data.map((item:any, index) => <TransCard {...item} key={index} />)
      ) : (
        <h1>Belum ada data...</h1>
      )}
    </>
  );
}
