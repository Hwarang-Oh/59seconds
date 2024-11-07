'use client';

import { useState, useRef, useEffect } from 'react';
import { type Editor } from '@tiptap/react';
import EmojiPicker from 'emoji-picker-react';
import {
  Bold,
  List,
  Smile,
  Italic,
  Heading2,
  ListOrdered,
  Strikethrough,
} from 'lucide-react';
import { Toggle } from './Toggle';

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Readonly<Props>) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmojiClick = (emojiData: any) => {
    editor?.chain().focus().insertContent(emojiData.emoji).run();
    setShowEmojiPicker(false);
  };

  if (!editor) {
    return null;
  }
  return (
    <div className="flex gap-3 border-b pb-3 bg-transparent">
      <Toggle
        size="md"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="md"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="md"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="md"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="md"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="md"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <button
        type="button"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="border px-2 rounded"
      >
        <Smile className="h-4 w-4" />
      </button>

      {showEmojiPicker && (
        <div className="absolute mt-2 z-10" ref={emojiPickerRef}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}
