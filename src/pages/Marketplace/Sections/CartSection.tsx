import { Heading, Progress } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchCart } from "../api/apihandler";
import HistoryCard from "../fragments/HistoryCard";

export let fetchCartData: Function;

export default function CartSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  fetchCartData = async () => {
    await fetchCart()
      .then((cart) => setData(cart))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  if (loading) return <Progress size="xs" isIndeterminate color="blue" />;

  return (
    <>
      <Heading>Keranjang</Heading>
      {data.length > 0 ? (
        data.map((item: any, index: number) => (
          <HistoryCard {...item} key={index} />
        ))
      ) : (
        <h1>Belum ada data...</h1>
      )}
    </>
  );
}
