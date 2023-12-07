import { Progress } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/apihandler';
import AddSection from '../Sections/AddSection';
import ListSection from '../Sections/ListSection';
import { motion } from 'framer-motion';
import { ANIM_TRANSITION } from '../../../utils/constants';
import ShopSection from '../Sections/ShopSection';
import CartSection from '../Sections/CartSection';

export default function Switcher({ value, search }: any) {
  const [loading, setLoading] = useState(true);

  const renderedEl = () => {
    switch (value) {
      case 'shop':
        return <ShopSection />;
      case 'add':
        return <AddSection />;
      case 'list':
        return <ListSection />;
      case 'cart':
        return <CartSection />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          ...ANIM_TRANSITION,
        }}
        style={{ width: '100%' }}
        exit={{ y: 300, opacity: 0, ...ANIM_TRANSITION }}
      >
        {renderedEl()}
      </motion.div>
    </AnimatePresence>
  );
}
