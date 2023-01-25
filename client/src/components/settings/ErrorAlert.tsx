import { Alert, AlertIcon } from "@chakra-ui/react";

const ErrorAlert = () => {
  return (
    <Alert status="error">
      <AlertIcon />
      Token jest nieprawidłowy. Spróbuj ponownie.
    </Alert>
  );
};

export default ErrorAlert;
