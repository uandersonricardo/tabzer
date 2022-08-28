import React from "react";

import { Flex, Spinner } from "@chakra-ui/react";

const Loading: React.FC = () => (
  <Flex w="100vw" h="100vh" bg="blue.400" align="center" justify="center">
    <Spinner color="white" size="xl" thickness="4px" emptyColor="blue.300" />
  </Flex>
);

export default Loading;
