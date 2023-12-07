import { Progress } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCoursesId } from './api/apihandler';
import DashboardCard from './fragments/DashboardCard';

export default function LmsID() {
  const [currClass, setCurrClass] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchClass = async () => {
    await fetchCoursesId(id!)
      .then((data) => {
        setCurrClass(data);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchClass()
  }, [])

  if (loading) {
    return <Progress colorScheme="green" isIndeterminate size="xs" />;
  } else {
    return <DashboardCard {...currClass} />;
  }
}
