import { AnimatePresence } from 'framer-motion';
import React from 'react';
import BlogsSection from '../Sections/BlogsSection';
import NewsSection from '../Sections/NewsSection';

export default function Switcher({ value }: { value: string }) {
  //kalau dari database sudab di beri value seperti active, selesai, dan lain lain tidak usah
  //memakai switcher ini, hanya perlu filter data response api saja.
  const renderedEl = () => {
    switch (value) {
      case 'news':
        return <NewsSection key={'news'} />;
      default:
        return <BlogsSection key={'default'} />;
    }
  };
  return <AnimatePresence exitBeforeEnter>{renderedEl()}</AnimatePresence>;
}
