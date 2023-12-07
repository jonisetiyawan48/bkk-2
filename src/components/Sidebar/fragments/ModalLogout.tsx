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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  clearLocalStorage,
  getLocalStorage,
} from '../../../utils/helpers/localstorage';
import {
  API_URL,
  LOCAL_STORAGE_TOKEN,
  LOGGED_CONFIG,
} from '../../../utils/constants';

import axios from 'axios';

import LogoutIcon from './LogoutIcon';

export default function ModalLogout({ isOpen, onOpen, onClose }: any) {
  const navigate = useNavigate();

  const _handleLogout = async () => {
    let LOGOUT_URL = `${API_URL}/users/logout`;

    var config = {
      method: 'post',
      url: LOGOUT_URL,
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
      },
    };

    await axios(config)
      .then(() => {
        clearLocalStorage();
        location.reload();
      })
      .catch((error) => {
        clearLocalStorage();
        location.reload();
      });
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="3xl" py={8}>
        <ModalBody alignItems="center" textAlign="center">
          <Center>
            <Icon
              width="201"
              height="200"
              viewBox="0 0 201 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <LogoutIcon />
            </Icon>
          </Center>
          <Text as="h3" fontSize={23} fontWeight={600}>
            Logout Akun
          </Text>
          <Text as="h6" fontSize={16} fontWeight={400}>
            Apa anda yakin keluar dari akun ini?
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            variant="outline"
            px="10%"
            colorScheme="red"
            mr={3}
            onClick={onClose}
            borderRadius="full"
          >
            Batal
          </Button>
          <Button
            px="10%"
            borderRadius="full"
            colorScheme="red"
            shadow="0 0 20px rgba(231, 0, 0, 20%)"
            onClick={() => _handleLogout()}
          >
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
