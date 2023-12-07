import { Progress } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { UID } from '../../../utils/constants';
import { checkRole } from '../../../utils/helpers/checkRole';
import { fetchInd } from './fragments/apihandler';
import Tables from './fragments/Tables';

export default function Kunjungan() {
  const [ind, setInd] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchApi = async () => {
    await fetchInd()
      .then((data) => {
        const filtered = data.filter((item: any) => item.createdBy === UID);
        setInd(checkRole(['1']) ? filtered : data);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (loading) {
    return <Progress colorScheme="pink" isIndeterminate size="xs" />;
  } else {
    return <Tables inds={ind} reload={fetchApi} />;
  }
}
