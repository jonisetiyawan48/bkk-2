import { Box } from "@chakra-ui/react";
import React, { Component } from "react";
import { LOCAL_STORAGE_USER } from "../utils/constants";
import { getLocalStorage } from "../utils/helpers/localstorage";
import Buttons from "./ApproveButtons/Buttons";

export default function RoleOptions({
  submissionId,
  payload,
  reload,
  children,
  page,
}: any) {
  const userRole = getLocalStorage(LOCAL_STORAGE_USER).roles;
  switch (userRole) {
    case "7":
      return (
        <>
          <Buttons
            submissionId={submissionId}
            reload={reload}
            page={page}
            payload={payload}
          />
          <Box h="5px" />
          {children}
        </>
      );
    case "5":
      return (
        <>
          <Buttons
            submissionId={submissionId}
            reload={reload}
            page={page}
            payload={payload}
          />
        </>
      );
    case "1":
      return <div>{children}</div>;
    default:
      return <div>not permitted</div>;
  }
}
