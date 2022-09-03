import React from "react";

import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import {
  AsyncCreatableSelect,
  ChakraStylesConfig,
  SelectComponentsConfig,
  chakraComponents,
  OptionProps,
  OptionBase,
  GroupBase,
  DropdownIndicatorProps,
  LoadingIndicatorProps
} from "chakra-react-select";
import { IoIosSearch } from "react-icons/io";

import searchSongs from "../../../requests/searchSongs";

interface SongSelectProps {
  onChange?: (value: string) => void;
}

interface SongOption extends OptionBase {
  label: string;
  value: string;
  image: string | null;
  artist: string;
}

const formatCreateLabel = (inputValue: string) => `Adicionar "${inputValue}"`;

const noOptionsMessage = () => "Nenhuma música encontrada";

const onChange = (value: any) => console.log(value);

const chakraStyles: ChakraStylesConfig<
  SongOption,
  true,
  GroupBase<SongOption>
> = {
  container: (provided, state) => ({
    ...provided,
    borderRadius: "0",
    width: "full"
  }),
  inputContainer: (provided, state) => ({
    ...provided,
    gridTemplateColumns: "0 auto"
  }),
  input: (provided, state) => ({
    ...provided,
    fontSize: "3xl",
    fontWeight: "bold"
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: "3xl",
    fontWeight: "bold"
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "gray.400",
    fontSize: "3xl",
    fontWeight: "bold"
  })
};

const components = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<SongOption, true, GroupBase<SongOption>>
  ) => <></>,
  LoadingIndicator: (
    props: LoadingIndicatorProps<SongOption, true, GroupBase<SongOption>>
  ) => (
    <chakraComponents.LoadingIndicator
      color="blue.400"
      emptyColor="gray.200"
      spinnerSize="sm"
      speed="0.45s"
      thickness="2px"
      {...props}
    />
  ),
  Option: ({
    children,
    ...props
  }: OptionProps<SongOption, true, GroupBase<SongOption>>) => (
    <chakraComponents.Option {...props}>
      {!props.data.artist ? (
        children
      ) : (
        <Flex align="center" gap="4">
          {props.data.artist && <Avatar src={props.data.image ?? undefined} />}
          <Flex direction="column" justify="center">
            <Text fontWeight="bold" fontSize="lg">
              {props.data.label}
            </Text>
            <Text
              color={props.isSelected ? "gray.200" : "gray.500"}
              fontSize="sm"
            >
              {props.data.artist}
            </Text>
          </Flex>
        </Flex>
      )}
    </chakraComponents.Option>
  )
};

const fetchOptions = async (inputValue: string) => {
  const response = await searchSongs({ q: inputValue });
  const data = response.data.map((song: any) => ({
    value: song.id,
    label: song.name,
    image: song.artist?.image_url,
    artist: song.artist?.name
  }));

  return data;
};

const SongSelect: React.FC<SongSelectProps> = () => {
  return (
    <AsyncCreatableSelect
      useBasicStyles
      variant="unstyled"
      chakraStyles={chakraStyles}
      components={components}
      placeholder="Título"
      size="lg"
      cacheOptions
      formatCreateLabel={formatCreateLabel}
      noOptionsMessage={noOptionsMessage}
      loadOptions={fetchOptions}
      onChange={onChange}
    />
  );
};

export default SongSelect;
