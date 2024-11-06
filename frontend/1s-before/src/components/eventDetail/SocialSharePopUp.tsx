import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import saveAs from 'file-saver';
import { Copy, Download, X, Share2, Link, Check } from 'lucide-react';

interface SocialSharePopUpProps {
  onClose: () => void;
  onCopyUrl: string;
}
export default function SocialSharePopUp({
  onClose,
  onCopyUrl,
}: Readonly<SocialSharePopUpProps>) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(onCopyUrl);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (err) {
      console.error('URL 복사 실패:', err);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('QRCode');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'event-qr.png');
        }
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            공유하기
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* URL Section */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
            <Link className="w-4 h-4" />
            링크 공유
          </p>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 p-3 rounded-lg text-sm text-gray-600 truncate">
              {onCopyUrl}
            </div>
            <button
              onClick={handleCopyUrl}
              className="px-4 py-2 bg-mainColor1 text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              {showCopySuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  완료
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  복사
                </>
              )}
            </button>
          </div>
        </div>

        {/* QR Code Section */}
        <div>
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
            <QRCode value="" className="w-4 h-4" />
            QR 코드
          </p>
          <div className="flex flex-col items-center bg-white p-4 rounded-lg border-2 border-dashed border-gray-200">
            <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
              <QRCode
                id="QRCode"
                value={onCopyUrl}
                size={200}
                className="h-auto max-w-full"
              />
            </div>
            <button
              onClick={handleDownloadQR}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              QR코드 저장하기
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
