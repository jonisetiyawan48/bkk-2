import { Container, Heading, Progress, useToast } from "@chakra-ui/react";

import ActiveUsersItems from "../../pages/Beranda/fragments/ActiveUsersItems";

import { useEffect, useState } from "react";
import { fetchOnlineUsers } from "../../utils/fetchOnlineUsers";

export default function OnlineUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const toast = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    let val = await fetchOnlineUsers();
    setLoading(false);

    if (val?.status != "success") {
      toast({
        title: `Error ${val?.code ?? 500}`,
        description: val?.message ?? "Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!",
        status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    setUsers(val.value);
    return;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container
      pos="sticky"
      bottom={40}
      mb={10}
      maxH="100vh"
      maxW="100vh"
      p={0}
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#E70000",
        },
      }}
    >
      <Heading fontSize={22} fontWeight={600} mt={4} mb={10}>
        Pengguna Online
      </Heading>
      {loading && <Progress size="xs" colorScheme="red" />}
      {users
        .filter((curr: any) => curr.isActiveLogin)
        .map(
          (
            item: {
              name: string;
              roles: 2 | 1 | 3 | 4 | 5 | 6 | 7;
              imageUrl?: string;
            },
            index
          ) => (
            <ActiveUsersItems {...item} key={index} />
          )
        )}
    </Container>
  );
}
