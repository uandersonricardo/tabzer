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

import DifficultySelect from "../../components/common/DifficultySelect";
import InstrumentSelect from "../../components/common/InstrumentSelect";
import TuningSelect from "../../components/common/TuningSelect";
import SongItem from "../../components/home/SongItem";

const Home: React.FC = () => {
  const [instrument, setInstrument] = useState("all");
  const [tuning, setTuning] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const onChangeInstrument = (value: string) => {
    setInstrument(value);
  };

  const onChangeTuning = (value: string) => {
    setTuning(value);
  };

  const onChangeDifficulty = (value: string) => {
    setDifficulty(value);
  };

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
        <InstrumentSelect
          onChange={onChangeInstrument}
          withAll
          showText={false}
        />
        <TuningSelect onChange={onChangeTuning} withAll showText={false} />
        <Spacer />
        <DifficultySelect onChange={onChangeDifficulty} withAll />
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
