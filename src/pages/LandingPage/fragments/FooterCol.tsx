import React from 'react';
import { Heading, UnorderedList, ListItem, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

type footerColType = {
  heading: string;
  list: Array<{ type: string; title: string; path: string }>;
};

const itemsLinks = (type: string, title: string, path: string) => {
  switch (type) {
    case 'nav':
      return <NavLink to={path}>{title}</NavLink>;
    case 'page':
      return (
        <Box cursor="pointer">
          <Link to={path} smooth={true}>
            {title}
          </Link>
        </Box>
      );
    case 'ext':
      return (
        <a href={path} target="_blank" rel="noreferrer">
          {title}
        </a>
      );
    default:
      return <a href="#">{title}</a>;
  }
};

export default function FooterCol({ heading, list }: footerColType) {
  return (
    <Box>
      <Heading>{heading}</Heading>
      <UnorderedList spacing={4} m={0} mt={4}>
        {list.map((item, index) => (
          <ListItem key={index} listStyleType="none">
            {itemsLinks(item.type, item.title, item.path)}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
