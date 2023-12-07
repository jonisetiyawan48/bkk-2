import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Send } from 'react-feather';
import React from 'react';

export default function CommentInput() {
  return (
    <InputGroup size="md" mt={4} alignItems="center">
      <Input
        py={6}
        borderRadius="full"
        focusBorderColor="red_darker"
        placeholder="Tulis Komentar"
      />
      <InputRightElement width="4.5rem" height="100%">
        <IconButton
          borderRadius="full"
          aria-label={'send'}
          icon={<Send />}
          variant="ghost"
          color="red"
        />
      </InputRightElement>
    </InputGroup>
  );
}
