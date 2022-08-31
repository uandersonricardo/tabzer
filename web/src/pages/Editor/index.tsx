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
  Text,
  VStack
} from "@chakra-ui/react";
import { GiGuitarHead } from "react-icons/gi";
import { IoMdMusicalNotes } from "react-icons/io";
import { TbChevronDown } from "react-icons/tb";

import TabEditor from "../../components/editor/TabEditor";

const instrumentOptions = [
  { value: "guitar", label: "Violão" },
  { value: "eletric-guitar", label: "Guitarra" }
];

const tuningOptions = [
  { value: "standard", label: "Padrão" },
  { value: "drop-d", label: "Drop D" },
  { value: "drop-c#", label: "Drop C#" },
  { value: "drop-c", label: "Drop C" }
];

const difficultyOptions = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" }
];

const Editor: React.FC = () => {
  const [instrument, setInstrument] = useState("guitar");
  const [tuning, setTuning] = useState("standard");
  const [difficulty, setDifficulty] = useState("beginner");

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
      <Flex align="center" w="full" gap="2" wrap="wrap" mb="4">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<TbChevronDown />}
            size="sm"
            variant="outline"
          >
            <Flex align="center" gap="2">
              <GiGuitarHead />
              <Text as="span">
                {
                  instrumentOptions.find(option => option.value === instrument)
                    ?.label
                }
              </Text>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuOptionGroup value={instrument} type="radio">
              {instrumentOptions.map(option => (
                <MenuItemOption
                  key={option.value}
                  value={option.value}
                  onClick={() => setInstrument(option.value)}
                >
                  {option.label}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<TbChevronDown />}
            size="sm"
            variant="outline"
          >
            <Flex align="center" gap="2">
              <IoMdMusicalNotes />
              <Text as="span">
                {tuningOptions.find(option => option.value === tuning)?.label}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuOptionGroup value={tuning} type="radio">
              {tuningOptions.map(option => (
                <MenuItemOption
                  key={option.value}
                  value={option.value}
                  onClick={() => setTuning(option.value)}
                >
                  {option.label}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Spacer />
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<TbChevronDown />}
            size="sm"
            variant="outline"
          >
            {
              difficultyOptions.find(option => option.value === difficulty)
                ?.label
            }
          </MenuButton>
          <MenuList>
            <MenuOptionGroup defaultValue={difficulty} type="radio">
              {difficultyOptions.map(option => (
                <MenuItemOption
                  key={option.value}
                  value={option.value}
                  onClick={() => setDifficulty(option.value)}
                >
                  {option.label}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
      <TabEditor />
    </Container>
  );
};

export default Editor;
