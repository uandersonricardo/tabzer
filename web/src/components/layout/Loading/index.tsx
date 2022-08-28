import React from "react";

import { Flex, Spinner } from "@chakra-ui/react";

const Loading: React.FC = () => (
  <Flex w="full" h="full" bg="white" align="center" justify="center">
    <Spinner color="blue.400" size="xl" thickness="4px" emptyColor="gray.200" />
  </Flex>
);

export default Loading;
