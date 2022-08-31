import React, { useCallback, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { createEditor, Descendant, Element, Transforms } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";

import ChordElement from "../../slate/ChordElement";
import ParagraphElement from "../../slate/ParagraphElement";
import ChordModal from "../ChordModal";
import TabToolbar from "../TabToolbar";

interface TabEditorProps {
  onChange?: (value: string) => void;
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }]
  }
];

const isToolbarEnabled = false;

const TabEditor: React.FC<TabEditorProps> = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSelectChord = useCallback((chord: string) => {
    if (chord && editor.selection) {
      const currentLevel = editor.selection.anchor.path[0];
      const currentElement = editor.children[Math.max(0, currentLevel - 1)];

      const shouldInsertNewChordsElement =
        currentLevel === 0 ||
        !Element.isElement(currentElement) ||
        currentElement.type !== "chords";

      if (shouldInsertNewChordsElement) {
        const path = [currentLevel];

        Transforms.insertNodes(
          editor,
          {
            type: "chords",
            children: [
              {
                text: chord,
                offset: editor.selection.anchor.offset
              }
            ]
          },
          {
            at: path
          }
        );
      } else {
        const path = [currentLevel - 1, currentElement.children.length];

        Transforms.insertNodes(
          editor,
          {
            text: chord,
            offset: editor.selection.anchor.offset
          },
          {
            at: path
          }
        );
      }
    }

    onClose();
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "chords":
        return <ChordElement {...props} />;
      case "paragraph":
        return <ParagraphElement {...props} />;
      default:
        return <ParagraphElement {...props} />;
    }
  }, []);

  return (
    <Slate editor={editor} value={initialValue}>
      {isToolbarEnabled && <TabToolbar onOpenChords={onOpen} />}
      <ChordModal isOpen={isOpen} onClose={onClose} onSelect={onSelectChord} />
      <Editable
        renderElement={renderElement}
        placeholder="Edite a tablatura"
        style={{ width: "100%" }}
      />
    </Slate>
  );
};

export default TabEditor;
