import { useEffect, useRef } from 'react';

interface ModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  message,
  isOpen,
  onClose,
}: Readonly<ModalProps>) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-10 shadow-lg max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="modal-title" className="text-lg font-semibold">
          {message}
        </p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="mt-10 px-3 py-2 bg-mainColor1 text-white rounded-lg hover:bg-mainColor2 focus:outline-none focus:ring-2"
          aria-label="닫기"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
