import { Alert, AlertIcon } from "@chakra-ui/react";

const SuccessAlert = () => {
  return (
    <Alert status="success">
      <AlertIcon />
      Token został zapisany.
    </Alert>
  );
};

export default SuccessAlert;
