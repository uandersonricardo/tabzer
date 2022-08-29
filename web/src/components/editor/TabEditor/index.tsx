import React, { useCallback, useState } from "react";

import { createEditor, Descendant } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";

import ParagraphElement from "../../slate/ParagraphElement";

interface TabEditorProps {
  onChange?: (value: string) => void;
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Edite a tablatura." }]
  }
];

const TabEditor: React.FC<TabEditorProps> = () => {
  const [editor] = useState(() => withReact(createEditor()));

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
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

export default TabEditor;
