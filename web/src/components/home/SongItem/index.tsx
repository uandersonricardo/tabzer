import React from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Text
} from "@chakra-ui/react";
import { GiGuitarHead } from "react-icons/gi";
import {
  IoMdHeadset,
  IoMdMusicalNotes,
  IoMdRocket,
  IoMdStar
} from "react-icons/io";
import { Link } from "react-router-dom";

interface SongItemProps {
  id: string;
  song: string;
  artist: string;
  version: string;
  genre: string;
  instrument: string;
  tuning: string;
  difficulty: string;
  image: string;
}

const SongItem: React.FC<SongItemProps> = ({
  id,
  song,
  artist,
  difficulty,
  genre,
  instrument,
  version,
  tuning,
  image
}) => {
  return (
    <Link to={`/song/${id}`} style={{ width: "100%" }}>
      <Button
        variant="outline"
        w="full"
        display="flex"
        flexDirection="column"
        p="6"
        alignItems="flex-start"
        h="auto"
      >
        <Flex align="center" w="full">
          <Image
            src={image}
            alt={artist}
            h="12"
            w="12"
            mr="4"
            rounded="xl"
            objectFit="cover"
          />
          <Flex flex="1" direction="column" align="start">
            <Text fontSize="xl" fontWeight="bold" mb="2">
              {song}
            </Text>
            <Text color="gray.500" fontSize="md">
              {artist}
            </Text>
          </Flex>
        </Flex>
        <Divider my="4" />
        <Flex w="full" align="center" rowGap="4" columnGap="12" flexWrap="wrap">
          <Text
            color="gray.500"
            fontSize="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={IoMdRocket} mr="2" />
            {version}
          </Text>
          <Text
            color="gray.500"
            fontSize="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={IoMdHeadset} mr="2" />
            {genre}
          </Text>
          <Text
            color="gray.500"
            fontSize="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={GiGuitarHead} mr="2" />
            {instrument}
          </Text>
          <Text
            color="gray.500"
            fontSize="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={IoMdMusicalNotes} mr="2" />
            {tuning}
          </Text>
          <Text
            color="gray.500"
            fontSize="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={IoMdStar} mr="2" />
            {difficulty}
          </Text>
        </Flex>
      </Button>
    </Link>
  );
};

export default SongItem;
