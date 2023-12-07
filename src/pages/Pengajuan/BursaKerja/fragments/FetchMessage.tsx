import { Text } from '@chakra-ui/react';

const FetchMessageEdit = ({
  condition,
  message,
}: {
  condition: string;
  message: string;
}) => {
  if (condition === 'success') {
    return (
      <Text textColor="green" my={2}>
        Sukses di Edit!
      </Text>
    );
  } else if (condition === 'error') {
    return (
      <Text textColor="red" my={2}>
        {message}
      </Text>
    );
  } else {
    return null;
  }
};

const FetchMessagePost = ({
  condition,
  message,
}: {
  condition: string;
  message: string;
}) => {
  if (condition === 'success') {
    return (
      <Text textColor="green" my={2}>
        Sukses di Tambahkan
      </Text>
    );
  } else if (condition === 'error') {
    return (
      <Text textColor="red" my={2}>
        {message}
      </Text>
    );
  } else {
    return null;
  }
};

const FetchMessageDelete = ({
  condition,
  message,
}: {
  condition: string;
  message: string;
}) => {
  if (condition === 'success') {
    return (
      <Text textColor="green" my={2}>
        Sukses di Hapus
      </Text>
    );
  } else if (condition === 'error') {
    return (
      <Text textColor="red" my={2}>
        {message}
      </Text>
    );
  } else {
    return null;
  }
};

export { FetchMessageEdit, FetchMessagePost, FetchMessageDelete };
