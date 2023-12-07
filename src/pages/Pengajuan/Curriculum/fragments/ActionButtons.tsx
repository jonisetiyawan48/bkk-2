import { Button, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import EditVector from '../../../../components/EditVector';
// import ModalEdit from './ModalEditBursa';

import { Edit2 } from 'react-feather';
import Edit from './Actions/Edit';
import Delete from './Actions/Delete';

export default function ActionButtons({ payload , reload}: any) {
  return (
    <>
      <Flex dir="row" justifyContent='space-around'>
        <Delete payload={payload} reload={reload}/>
        <Edit payload={payload} reload={reload}/>
      </Flex>
    </>
  );
}
