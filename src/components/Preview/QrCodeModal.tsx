import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Modal } from '../common';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  url = window.location.href,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="扫码预览" size="sm">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white rounded-xl shadow-inner">
          <QRCodeSVG
            value={url}
            size={200}
            level="M"
            includeMargin
            fgColor="#1a1a1a"
          />
        </div>
        <p className="text-sm text-gray-500 text-center">
          使用微信扫描二维码<br />
          在手机上预览排版效果
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>仅本地预览，不会上传任何内容</span>
        </div>
      </div>
    </Modal>
  );
};
