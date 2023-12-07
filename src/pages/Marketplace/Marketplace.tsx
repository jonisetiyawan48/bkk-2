import React, { useState } from 'react';

import {
  Container,
  GridItem,
  Grid,
  Stack,
  Heading,
  Button,
  useDisclosure,
  Flex,
  Input,
  Box,
} from '@chakra-ui/react';
import Switcher from './Switcher/Switcher';
import { List, PlusCircle } from 'react-feather';
import SwitcherButtons from './Switcher/SwitcherButtons';
import { ShoppingCart, Tag, Grid as GridIcon } from 'react-feather';
import { USER_ROLE } from '../../utils/constants';
import { checkRole } from '../../utils/helpers/checkRole';
import OnlineUsers from '../../components/Sidebar/OnlineUsers';

export default function Marketplace() {
  const [searchText, setSearch] = useState(''); //useless, nanti diganti
  const [currentSection, setSection] = useState(
    checkRole(['5', '7']) ? 'add' : 'shop'
  );

  return (
    <Container maxW="100%" p={0}>
      <Grid 
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={8}
      >
        <GridItem colSpan={{ base: 1, lg: 2, xl: 3 }} w="100%">
          <Switcher value={currentSection} search={searchText} />
        </GridItem>
        <GridItem colSpan={1}>
          <OnlineUsers />
          {/* <Box pos="sticky" top={40}>
            {checkRole(['1']) && (
              <SwitcherButtons
                title={'Daftar barang'}
                value={'shop'}
                stateValue={currentSection}
                handleValue={setSection}
                icon={GridIcon}
              />
            )}
            {checkRole(['5', '7']) && (
              <SwitcherButtons
                title={'Data Barang'}
                value={'add'}
                stateValue={currentSection}
                handleValue={setSection}
                icon={List}
              />
            )}
          </Box> */}
        </GridItem>
      </Grid>
    </Container>
  );
}
