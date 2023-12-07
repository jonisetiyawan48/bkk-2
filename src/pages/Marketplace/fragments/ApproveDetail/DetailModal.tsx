import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
  Center,
  Icon,
  ModalHeader,
  ModalCloseButton,
  Grid,
  Box,
  Divider,
} from '@chakra-ui/react';
import { isoToString } from '../../../../utils/helpers/isoDateFormatter';

export default function DetailModal({ isOpen, onClose, props }: any) {
  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="3xl">
        <ModalHeader>Detail transaksi</ModalHeader>
        <ModalCloseButton />
        <ModalBody alignItems="center" textAlign="center">
          <Box gridTemplateRows="repeat(2,1fr)">
            <Grid templateColumns="repeat(2,1fr)" gap={5} my={3}>
              {/* <Box textAlign="start">
                <Text fontSize={15} color="grey">
                  Nama
                </Text>
                <Text fontWeight={500}>Prash Trisula Ajinata</Text>
              </Box> */}
              <Box textAlign="start">
                <Text fontSize={15} color="grey">
                  Alamat
                </Text>
                <Text fontWeight={500}>{props.props.address}</Text>
              </Box>
              <Box textAlign="start">
                <Text fontSize={15} color="grey">
                  Instansi
                </Text>
                <Text fontWeight={500}>{props.props.agency}</Text>
              </Box>
              <Box textAlign="start">
                <Text fontSize={15} color="grey">
                  Kota
                </Text>
                <Text fontWeight={500}>{props.props.city}</Text>
              </Box>
              <Box textAlign="start">
                <Text fontSize={15} color="grey">
                  Telepon
                </Text>
                <Text fontWeight={500}>{props.props.tel}</Text>
              </Box>
              <Box textAlign="start">
                <Text fontSize={15} color="grey">
                  Tanggal
                </Text>
                <Text fontWeight={500}>{isoToString(props.props.date)}</Text>
              </Box>
              <Box textAlign="start">
                <Text fontSize={15} color="grey">
                  Nomor Invoice
                </Text>
                <Text fontWeight={500}>{props.props.invoice}</Text>
              </Box>
            </Grid>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" py={4}>
            <Text color="orange">{props.props.name}</Text>
            <Text>x {props.props.amount}</Text>
          </Box>
          <Box display="flex" justifyContent="space-between" py={4}>
            <Text color="grey" fontSize={14}>
              Total Pembayaran : 
            </Text>
            <Text>{props.props.total}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
