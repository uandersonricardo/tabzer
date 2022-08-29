import React, { useContext, useState } from "react";

import {
  Button,
  Container,
  Flex,
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

import SongItem from "../../components/home/SongItem";

const instrumentOptions = [
  { value: "all", label: "Todos os instrumentos" },
  { value: "guitar", label: "Violão" },
  { value: "eletric-guitar", label: "Guitarra" }
];

const tuningOptions = [
  { value: "all", label: "Todas as afinações" },
  { value: "standard", label: "Padrão" },
  { value: "drop-d", label: "Drop D" },
  { value: "drop-c#", label: "Drop C#" },
  { value: "drop-c", label: "Drop C" }
];

const difficultyOptions = [
  { value: "all", label: "Qualquer dificuldade" },
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" }
];

const Home: React.FC = () => {
  const [instrument, setInstrument] = useState("all");
  const [tuning, setTuning] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  return (
    <Container
      maxW="7xl"
      h="full"
      p={{ base: "6", md: "12" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Flex align="center" w="full" gap="2" wrap="wrap">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<TbChevronDown />}
            size="sm"
            variant="outline"
          >
            <GiGuitarHead />
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
            <IoMdMusicalNotes />
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
      <VStack spacing="6" w="full" mt="8">
        <SongItem
          id="1"
          artist="Bring Me The Horizon"
          difficulty="Intermediário"
          genre="Rock"
          instrument="Guitarra"
          song="Happy Song"
          tuning="Drop C"
          version="Principal"
          image="https://i0.wp.com/www.wikimetal.com.br/wp-content/uploads/2022/07/BringMeTheHorizon.jpg?resize=1170%2C658&ssl=1"
        />
        <SongItem
          id="2"
          artist="Avenged Sevenfold"
          difficulty="Difícil"
          genre="Rock"
          instrument="Guitarra"
          song="Afterlife"
          tuning="Drop D"
          version="Principal"
          image="https://www.vagalume.com.br/avenged-sevenfold/images/avenged-sevenfold.jpg"
        />
      </VStack>
    </Container>
  );
};

export default Home;
