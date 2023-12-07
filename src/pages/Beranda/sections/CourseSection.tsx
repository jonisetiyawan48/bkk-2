import { VStack, Heading, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import Switcher from '../fragments/Switcher';
import SwitcherButton from '../fragments/SwitcherButton';

export default function CourseSection() {
  const [currentSect, setSect] = useState('');

  return (
    <VStack alignItems="start" gap={4}>
      <Heading>Daftar Course</Heading>
      <HStack gap={4}>
        <SwitcherButton
          title={'semua'}
          value={''}
          statevalue={currentSect}
          handleValue={setSect}
        />
        <SwitcherButton
          title={'tergabung'}
          value={'tergabung'}
          statevalue={currentSect}
          handleValue={setSect}
        />
      </HStack>
      <Switcher value={currentSect} />
    </VStack>
  );
}
