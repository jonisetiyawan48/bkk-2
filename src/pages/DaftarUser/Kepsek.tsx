import React, { useEffect, useState } from 'react';
import { Progress, useToast } from '@chakra-ui/react';
import { fetchUsers } from './api/apihandler';
import UsersTable from './fragments/Table';

export let fetchKepsek:Function

export default function Kepsek() {
  const [userList, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  fetchKepsek = async () => {
    setLoading(true)
    let val = await fetchUsers();
    setLoading(false);

    if (val?.status != "success") {
      toast({
        title: `Error ${val?.code ?? 500}`,
        description: val?.message ?? 'Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!',
        status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    setList(val.value);
    return;
  };

  useEffect(() => {
    fetchKepsek();
  }, []);

  if (loading) {
    return <Progress colorScheme="teal" isIndeterminate size="xs" />;
  } else {
    return <UsersTable role={1} userList={userList} reload={fetchKepsek}/>;
  }
}
