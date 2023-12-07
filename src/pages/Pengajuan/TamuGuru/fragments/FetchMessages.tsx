import { Text } from '@chakra-ui/react';

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
  } else if (condition === 'failed') {
    return (
      <Text textColor="red" my={2}>
        {message}
      </Text>
    );
  } else {
    return null;
  }
};

export { FetchMessagePost };
