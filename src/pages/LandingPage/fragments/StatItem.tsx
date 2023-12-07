import React from 'react';
import { Box, Image, Heading, Text, GridItem } from '@chakra-ui/react';

type ThisPropType = {
  icon: any;
  name: string;
  value: number;
  color: string;
};

export default function StatItem({ icon, name, value, color }: ThisPropType) {
  return (
    <GridItem display="flex" justifyContent="center" textAlign="center">
      <Box justifyContent="center" display="flex" flexDirection="column">
        <Image
          src={icon}
          p={3}
          background={color}
          borderRadius="xl"
          w={20}
          h={20}
          alignSelf='center'
        />
        <Text fontWeight={700} fontSize={22} py={3}>
          {value}
        </Text>
        <Text fontWeight={600} fontSize={14} textOverflow="clip" noOfLines={1}>
          {name}
        </Text>
      </Box>
    </GridItem>
  );
}
