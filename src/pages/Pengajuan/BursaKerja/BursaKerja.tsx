import { Progress } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { UID } from '../../../utils/constants';
import { checkRole } from '../../../utils/helpers/checkRole';
import { fetchJobs } from './fragments/apihandler';
import Wrapper from './fragments/Tables';
import PostBursa from './fragments/PostBursa';
import { Navigate, useLocation } from 'react-router-dom';
import {
  Heading
} from '@chakra-ui/react';

export default function BursaKerja() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchApi = () => {
    // setLoading(true);
    fetchJobs()
      .then((data) => {
        // const filtered = data.value?.filter((item: any) => item.createdBy === UID);
        // setJobs(checkRole(['1']) ? filtered : data);
        setJobs(data.value);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (loading) 
    return <Progress colorScheme="green" isIndeterminate size="xs" />;
  else {
    if (checkRole(['7'])) 
      return <Wrapper jobs={jobs} reload={fetchApi} />
    else if (checkRole(['1', '5']))
      return ( jobs != null ? (<PostBursa jobs={jobs} reload={fetchApi} />) : (<Heading my={2}>Belum ada data...</Heading>))
    else 
      return <Navigate to={'/main/beranda'} state={{from:location}} replace/>
  }
}
