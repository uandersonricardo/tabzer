import React from "react";

import { Flex, Spinner } from "@chakra-ui/react";

const AuthLoading: React.FC = () => (
  <Flex w="full" h="full" bg="blue.400" align="center" justify="center">
    <Spinner color="white" size="xl" thickness="4px" emptyColor="blue.300" />
  </Flex>
);

export default AuthLoading;
