import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export interface ParagraphElement {
  type: "paragraph";
  children: TextChild[];
}

export interface ChordsElement {
  type: "chords";
  children: ChordChild[];
}

export interface TextChild {
  text: string;
  bold?: boolean;
}

export interface ChordChild {
  text: string;
  offset: number;
}

export type CustomElement = ParagraphElement | ChordsElement;
export type CustomText = TextChild | ChordChild;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
