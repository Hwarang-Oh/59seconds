'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import Toolbar from './ToolBar';
import '@/styles/editorStyles.css';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import Document from '@tiptap/extension-document';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

type TiptapProps = {
  value: string;
  onChange: (content: string) => void;
};

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      BulletList,
      ListItem,
      OrderedList,
      Heading.configure({ levels: [2] }),
    ],
    content: value || '',
    autofocus: false,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      onChange(htmlContent);
    },
    editorProps: {
      attributes: {
        class: 'ProseMirror',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <>
      <Toolbar editor={editor} />
      <div className="w-full p-2 border rounded">
        <EditorContent editor={editor} className="p-3" />
      </div>
    </>
  );
};

export default Tiptap;
