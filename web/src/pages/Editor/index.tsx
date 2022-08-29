import React, { useContext, useState } from "react";

import {
  Button,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  VStack
} from "@chakra-ui/react";
import { GiGuitarHead } from "react-icons/gi";
import { IoMdMusicalNotes } from "react-icons/io";
import { TbChevronDown } from "react-icons/tb";

const Editor: React.FC = () => {
  return (
    <Container
      maxW="7xl"
      h="full"
      p={{ base: "6", md: "12" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading>Teste</Heading>
    </Container>
  );
};

export default Editor;
