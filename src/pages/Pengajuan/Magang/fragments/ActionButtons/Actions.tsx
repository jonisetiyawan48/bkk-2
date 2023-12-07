import { Flex } from '@chakra-ui/react';
import React from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export default function Actions({payload, reload}:any) {
  return (
    <Flex dir="row" justifyContent='space-around'>
      <DeleteButton payload={payload} reload={reload}/>
      <EditButton payload={payload} reload={reload}/>
    </Flex>
  );
}
