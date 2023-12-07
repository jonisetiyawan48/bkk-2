import { AnimatePresence } from 'framer-motion';
import React from 'react';
import ActivityCard from '../fragments/ActivityCard';
import Members from '../fragments/Members';

export default function Switcher({ stateValue, props, className }: any) {
  const renderedEl = () => {
    switch (stateValue) {
      case 'aktivitas':
        return props.map((item:any, index:number) => (
          <ActivityCard props={item} key={index} className={className}/>
        ));
      case 'peserta':
        return <Members key='peserta'/>;
    }
  };

  return <AnimatePresence exitBeforeEnter>{renderedEl()}</AnimatePresence>;
}
