import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Icon,
} from '@chakra-ui/react';

import { List } from 'react-feather';
import { useLocation } from 'react-router-dom';
import { checkRole } from '../../../utils/helpers/checkRole';
import AccordionNav from './AccordionNav';

export default function DaftarUserAccordion() {
  const location = useLocation();
  const active = location.pathname.split('/')[2] == 'daftar-user';

  return (
    <Accordion allowMultiple my={1}>
      <AccordionItem border="0">
        <AccordionButton
          borderRadius="22px"
          py={3}
          _hover={active ? { bg: 'red_darker' } : undefined}
          bg={active ? 'red_lighter' : undefined}
          color={active ? 'white' : undefined}
          _expanded={active ? { bg: 'red_lighter', color: 'white' } : undefined}
        >
          <Box flex="1" textAlign="left" fontWeight={500}>
            <Icon as={List} mr="5%" />
            Manajemen User
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} transitionDuration="0">
          {checkRole(['1', '7']) && (
            <>
              <AccordionNav
                title={'Siswa'}
                path={'/main/daftar-user/siswa'}
              />
              <AccordionNav
                title={'Guru'}
                path={'/main/daftar-user/guru'}
              />
            </>
          )}
          {checkRole(['7']) && (
            <>
              <AccordionNav
                title={'SMK Vokasi'}
                path={'/main/daftar-user/vokasi'}
              />
              <AccordionNav
                title={'Kepala Sekolah'}
                path={'/main/daftar-user/kepsek'}
              />
              <AccordionNav
                title={'Kemendikbud'}
                path={'/main/daftar-user/kemendikbud'}
              />
            </>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
