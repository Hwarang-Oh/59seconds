'use client';

import { useEditor, EditorContent } from '@tiptap/react';
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
  value: string; // string 타입으로 지정
  onChange: (content: string) => void; // onChange에 대한 타입 지정
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
      onChange(htmlContent); // 에디터 내용이 변경될 때 부모로 전달
    },
    editorProps: {
      attributes: {
        class: 'ProseMirror', // 에디터에 클래스 지정
      },
    },
  });

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
