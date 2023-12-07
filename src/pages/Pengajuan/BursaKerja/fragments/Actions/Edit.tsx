import { IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Edit2 } from "react-feather";
import ModalEdit from "../ModalEditBursa";
import ModalEditBursaRequestList from "../ModalEditBursaRequestList";

export default function Edit({ payload, reload, page }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {page != "request-list" && (
        <ModalEdit
          isOpen={isOpen}
          onClose={onClose}
          payload={payload}
          reload={reload}
        />
      )}
      {/* <ModalEditBursaRequestList isOpen={isOpen} onClose={onClose} payload={payload} reload={reload} /> */}
      {page != "request-list" && (
        <IconButton
          onClick={onOpen}
          aria-label="edit"
          icon={<Edit2 />}
          borderRadius="2xl"
          p={2}
          bg="edit_bg"
          _hover={{ bg: "edit_hover" }}
          _pressed={{ bg: "edit_press" }}
          colorScheme="blue"
        >
          Edit
        </IconButton>
      )}
    </>
  );
}
