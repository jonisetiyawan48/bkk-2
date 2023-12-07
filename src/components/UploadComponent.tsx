import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

export default function UploadComponent({name, setFieldValue}: any) {
  const [file, setFilename] = useState('');
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*' : []},
    onDrop: (acceptedFiles) => {
      setFieldValue(name, acceptedFiles[0]);
      setFilename(acceptedFiles[0].name)
    },
    multiple: false    
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      {/* <input {...getInputProps} /> */}
      <Box
        h={40}
        w="full"
        border={isDragActive ? '8px' : '0'}
        borderColor='grey'
        bgColor="grey_bg"
        borderRadius="3xl"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        {...getInputProps}
        transition='border 150ms'
        _hover={{cursor: "pointer"}}
      >
        {isDragActive ? (
          <Text as="h6" color="grey">
            Drop filenya
          </Text>
        ) : (
          <Text as="h6">
            Tarik gambar kesini atau{' '}
            <strong style={{ color: 'red', cursor: 'pointer' }}>Upload</strong>
          </Text>
        )}
        {file ?  `File name: ${file}` : " "}
      </Box>
    </div>
  );
}
