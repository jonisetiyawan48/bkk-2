import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Icon,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FileText } from 'react-feather';
import { useLocation } from 'react-router-dom';
import { checkRole } from '../../../utils/helpers/checkRole';
import AccordionNav from './AccordionNav';

export default function PengajuanAccordion() {
  const location = useLocation();
  const active = location.pathname.split('/')[2] == 'pengajuan';

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
            <Icon as={FileText} mr="5%" />
            Pengajuan
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} transitionDuration="0">
          <AccordionNav
            title={'Guru Tamu'}
            path={'/main/pengajuan/tamuguru'}
          />
          <AccordionNav
            title={'Guru Penguji'}
            path={'/main/pengajuan/penguji'}
          />
          <AccordionNav
            title={'Penyelarasan Kurikulum'}
            path={'/main/pengajuan/curriculum'}
          />
          <AccordionNav
            title={'Magang Guru/Siswa'}
            path={'/main/pengajuan/magang'}
          />
          <AccordionNav
            title={'Kunjungan Industri'}
            path={'/main/pengajuan/kunjungan'}
          />
          <AccordionNav
            title={'Sertifikasi online'}
            path={'/main/pengajuan/sertifikasi'}
          />
          <AccordionNav
            title={'Bursa kerja'}
            path={'/main/pengajuan/bursakerja'}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
