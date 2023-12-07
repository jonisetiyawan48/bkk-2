import { Flex } from "@chakra-ui/react";
import React from "react";
import Approve from "./Approve";
import Decline from "./Decline";

export default function Buttons({ submissionId, payload, reload, page }: any) {
  return (
    <Flex dir="row" justifyContent="space-around">
      <Approve
        submissionId={submissionId}
        reload={reload}
        page={page}
        payload={payload}
      />
      <Decline
        submissionId={submissionId}
        reload={reload}
        page={page}
        payload={payload}
      />
    </Flex>
  );
}
