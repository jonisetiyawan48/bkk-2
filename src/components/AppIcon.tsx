import { Image } from '@chakra-ui/react';
import React from 'react';
import Logo from '../assets/images/logo.png'

export const AppIcon = (props: any) => (
  <Image src={Logo} alt="Telkom PDE" {...props}/>
);

export default AppIcon;
