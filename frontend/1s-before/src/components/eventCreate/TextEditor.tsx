import React, { useEffect, useRef, useState } from 'react';

interface RichTextEditorProps {
  initialContent: string;
  onContentChange: (content: string) => void;
}

export default function RichTextEditor({
  initialContent,
  onContentChange,
}: Readonly<RichTextEditorProps>) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<string>('Arial');

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent; // 초기 내용 설정
    }
  }, [initialContent]);

  const applyStyle = (style: string, value: string) => {
    if (!editorRef.current) return;
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style[style as any] = value;
      range.surroundContents(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setFontSize(value);
    applyStyle('fontSize', `${value}px`);
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFontFamily(value);
    applyStyle('fontFamily', value);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML); // 상위 컴포넌트로 변경 내용 전달
    }
  };

  return (
    <div className="p-4 border rounded">
      {/* Toolbar */}
      <div className="toolbar mb-2 flex space-x-2">
        <select value={fontFamily} onChange={handleFontFamilyChange}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Noto Sans KR">Noto Sans KR</option>
        </select>

        <select value={fontSize} onChange={handleFontSizeChange}>
          <option value={10}>10px</option>
          <option value={13}>13px</option>
          <option value={16}>16px</option>
          <option value={18}>18px</option>
          <option value={24}>24px</option>
        </select>

        <button
          type="button"
          onClick={() => applyStyle('fontWeight', 'bold')}
          className="p-1 border rounded"
        >
          <b className="p-1">B</b>
        </button>
        <button
          type="button"
          onClick={() => applyStyle('fontStyle', 'italic')}
          className="p-1 border rounded"
        >
          <i className="p-1 pr-2">I</i>
        </button>
        <button
          type="button"
          onClick={() => applyStyle('textDecoration', 'underline')}
          className="p-1 border rounded"
        >
          <u className="p-1">U</u>
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput} // 사용자가 입력할 때마다 내용 전달
        className="w-full p-2 border rounded min-h-[200px]"
        style={{ fontFamily, fontSize: `${fontSize}px` }}
      >
        {/* 초기 내용이 이 div에 설정되므로 children을 사용하지 않습니다 */}
      </div>
    </div>
  );
}
