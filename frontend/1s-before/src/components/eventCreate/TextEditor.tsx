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
  const savedSelection = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  // Save selection before applying style
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelection.current = selection.getRangeAt(0);
    }
  };

  // Restore selection after applying style
  const restoreSelection = () => {
    const selection = window.getSelection();
    if (savedSelection.current && selection) {
      selection.removeAllRanges();
      selection.addRange(savedSelection.current);
    }
  };

  const applyExecCommand = (command: string, value: string) => {
    saveSelection(); // Save caret position
    restoreSelection(); // Restore caret position after style application
    document.execCommand(command, false, value);
    handleInput(); // Trigger input change handler after applying style
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = `${e.target.value}px`;
    setFontSize(Number(e.target.value));
    applyExecCommand('fontSize', value);
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFontFamily(value);
    applyExecCommand('fontName', value);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
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
          onClick={() => applyExecCommand('bold', '')}
          className="p-1 border rounded"
        >
          <b className="p-1">B</b>
        </button>
        <button
          type="button"
          onClick={() => applyExecCommand('italic', '')}
          className="p-1 border rounded"
        >
          <i className="p-1 pr-2">I</i>
        </button>
        <button
          type="button"
          onClick={() => applyExecCommand('underline', '')}
          className="p-1 border rounded"
        >
          <u className="p-1">U</u>
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyUp={saveSelection} // Save selection on key up
        onMouseUp={saveSelection} // Save selection on mouse up
        className="w-full p-2 border rounded min-h-[200px]"
        style={{ fontFamily, fontSize: `${fontSize}px` }}
      ></div>
    </div>
  );
}
