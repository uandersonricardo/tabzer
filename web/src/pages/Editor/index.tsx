import React, { useContext, useState } from "react";

import {
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  Spacer,
  VStack
} from "@chakra-ui/react";
import { Node } from "slate";

import DifficultySelect from "../../components/common/DifficultySelect";
import InstrumentSelect from "../../components/common/InstrumentSelect";
import TuningSelect from "../../components/common/TuningSelect";
import SongSelect from "../../components/editor/SongSelect";
import TabEditor from "../../components/editor/TabEditor";

const Editor: React.FC = () => {
  const [instrument, setInstrument] = useState("guitar");
  const [tuning, setTuning] = useState("standard");
  const [difficulty, setDifficulty] = useState("beginner");
  const [tabs, setTabs] = useState<Node[]>();

  const onChangeTabs = (value: Node[]) => {
    setTabs(value);
  };

  const onChangeInstrument = (value: string) => {
    setInstrument(value);
  };

  const onChangeTuning = (value: string) => {
    setTuning(value);
  };

  const onChangeDifficulty = (value: string) => {
    setDifficulty(value);
  };

  const onSave = () => {
    console.log(instrument, tuning, difficulty, tabs);
  };

  return (
    <Container
      maxW="7xl"
      h="full"
      p={{ base: "6", md: "12" }}
      display="flex"
      flexDirection="column"
      alignItems="start"
    >
      <VStack spacing="2" mb="4" w="full">
        <SongSelect />
        {/* <Input
          variant="unstyled"
          placeholder="Título"
          size="lg"
          borderRadius="0"
          fontSize="3xl"
          fontWeight="bold"
          _placeholder={{ color: "gray.400" }}
          mb="2"
        /> */}
        <Input
          variant="unstyled"
          placeholder="Artista"
          borderRadius="0"
          fontSize="xl"
          _placeholder={{ color: "gray.400" }}
          mb="4"
        />
      </VStack>
      <Flex align="center" w="full" gap="2" wrap="wrap" mb="4">
        <InstrumentSelect onChange={onChangeInstrument} />
        <TuningSelect onChange={onChangeTuning} />
        <Spacer />
        <DifficultySelect onChange={onChangeDifficulty} />
      </Flex>
      <TabEditor onChange={onChangeTabs} />
      <Button colorScheme="blue" size="lg" mt="8" w="full" onClick={onSave}>
        Salvar
      </Button>
    </Container>
  );
};

export default Editor;
