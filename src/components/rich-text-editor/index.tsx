"use client";

import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "./menu-bar";

interface RichTextEditorProps {
  value: string;
  disabled?: boolean;
  editable?: boolean;
  onChange?: (content: string) => void;
}
export default function RichTextEditor({
  value,
  editable,
  disabled,
  onChange,
}: RichTextEditorProps) {
  const isEditable = editable ?? false;

  const editor = useEditor({
    editable: isEditable,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: isEditable ? "min-h-[156px] border rounded-md py-2 px-3" : "",
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });
  return (
    <div>
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} disabled={disabled} />
    </div>
  );
}
