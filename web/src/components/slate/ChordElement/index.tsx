import React from "react";

import { Badge, Box, Text } from "@chakra-ui/react";
import { RenderElementProps } from "slate-react";

const ChordElement: React.FC<RenderElementProps> = ({
  element,
  attributes
}) => {
  if (element.type !== "chords") {
    return null;
  }

  return (
    <Box
      as="p"
      position="relative"
      fontFamily="mono"
      userSelect="none"
      {...attributes}
    >
      &nbsp;
      {element.children.map((child, index) => (
        <Badge
          key={index}
          colorScheme="blue"
          fontWeight="bold"
          ml={`${child.offset - 1}ch`}
          position="absolute"
        >
          {child.text}
        </Badge>
      ))}
    </Box>
  );
};

export default ChordElement;
