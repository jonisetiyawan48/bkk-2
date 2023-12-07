import { Container, Flex, Grid, GridItem, Heading, Progress } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/apihandler';
import ShopCard from '../fragments/ShopCard';

export default function ShopSection() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await fetchProducts()
      .then((data) => setListing(data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return <Progress colorScheme="green" isIndeterminate size="xs" />;
  if (listing.length === 0) return <h1>Belum ada data...</h1>;

  return (
    <>
      <Flex dir="row" mb={6} justifyContent="space-between" maxW="full">
        <Heading>Daftar barang</Heading>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {listing.map((item:Object, index) => (
          <GridItem rowSpan={1} key={index}>
            <ShopCard {...item} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
