import React, { useCallback, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { createEditor, Descendant, Transforms } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";

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

const TabEditor: React.FC<TabEditorProps> = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSelectChord = (chord: string) => {
    if (chord && editor.selection) {
      const newPath = [editor.selection.anchor.path[0]];

      Transforms.insertNodes(
        editor,
        {
          type: "paragraph",
          children: [
            {
              text:
                new Array(editor.selection.anchor.offset).fill(" ").join("") +
                chord,
              bold: true
            }
          ]
        },
        {
          at: newPath
        }
      );
    }

    onClose();
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "paragraph":
        return <ParagraphElement {...props} />;
      default:
        return <ParagraphElement {...props} />;
    }
  }, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <TabToolbar onOpenChords={onOpen} />
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
