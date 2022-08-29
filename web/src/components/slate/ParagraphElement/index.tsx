import React from "react";

import { Box } from "@chakra-ui/react";
import { RenderElementProps } from "slate-react";

const ParagraphElement: React.FC<RenderElementProps> = ({
  attributes,
  children
}) => {
  return (
    <Box as="p" fontFamily="mono" {...attributes}>
      {children}
    </Box>
  );
};

export default ParagraphElement;
