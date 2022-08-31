import React, { useEffect, useRef } from "react";

import { Button, Flex, Portal } from "@chakra-ui/react";
import { Editor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";

interface TabToolbarProps {
  onOpenChords: () => void;
}

const TabToolbar: React.FC<TabToolbarProps> = ({ onOpenChords }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    const domSelection = window.getSelection();

    if (
      !selection ||
      !inFocus ||
      domSelection?.rangeCount === 0 ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();

    if (rect) {
      el.style.opacity = "1";
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${
        rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
      }px`;
    }
  });

  return (
    <Portal>
      <Flex
        ref={ref}
        top="-10000px"
        left="-10000px"
        position="absolute"
        zIndex="popover"
        opacity="0"
        transition="opacity 0.25s"
        borderRadius="md"
        p="1"
        bg="gray.700"
        onMouseDown={e => {
          e.preventDefault();
        }}
        gap="1"
        mt="-2"
      >
        <Button
          size="sm"
          p="2"
          bgColor="gray.700"
          color="white"
          _hover={{ bgColor: "gray.800" }}
          _active={{ bgColor: "gray.800" }}
          onClick={onOpenChords}
        >
          + Acorde
        </Button>
        <Button
          size="sm"
          p="2"
          bgColor="gray.700"
          color="white"
          _hover={{ bgColor: "gray.800" }}
          _active={{ bgColor: "gray.800" }}
        >
          + Tab
        </Button>
      </Flex>
    </Portal>
  );
};

export default TabToolbar;
