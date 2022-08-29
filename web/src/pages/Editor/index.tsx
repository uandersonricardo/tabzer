import React, { useContext, useState } from "react";

import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
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

import TabEditor from "../../components/editor/TabEditor";

const Editor: React.FC = () => {
  return (
    <Container
      maxW="7xl"
      h="full"
      p={{ base: "6", md: "12" }}
      display="flex"
      flexDirection="column"
      alignItems="start"
    >
      <Input
        variant="unstyled"
        placeholder="Título"
        size="lg"
        borderRadius="0"
        fontSize="3xl"
        fontWeight="bold"
        _placeholder={{ color: "gray.400" }}
        mb="2"
      />
      <Input
        variant="unstyled"
        placeholder="Artista"
        borderRadius="0"
        fontSize="xl"
        _placeholder={{ color: "gray.400" }}
        mb="4"
      />
      <TabEditor />
    </Container>
  );
};

export default Editor;
