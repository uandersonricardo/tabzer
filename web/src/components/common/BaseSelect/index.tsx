import React from "react";

import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text
} from "@chakra-ui/react";
import { TbChevronDown } from "react-icons/tb";

interface BaseSelectProps {
  icon?: React.ReactNode;
  options?: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  showText?: boolean;
}

const BaseSelect: React.FC<BaseSelectProps> = ({
  icon,
  options = [],
  value,
  onChange = () => undefined,
  showText = true
}) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<TbChevronDown />}
        size="sm"
        variant="outline"
      >
        <Flex align="center" gap="2">
          {icon}
          {showText && (
            <Text as="span">
              {options.find(option => option.value === value)?.label}
            </Text>
          )}
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup value={value} type="radio">
          {options.map(option => (
            <MenuItemOption
              key={option.value}
              value={option.value}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default BaseSelect;
