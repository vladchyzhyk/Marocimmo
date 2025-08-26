'use client';

import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actionChildren?: React.ReactNode;
  className?: string;
  widthClassName?: string;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actionChildren,
  className = '',
  widthClassName = 'max-w-[414px] w-[calc(100%-32px)]',
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-[var(--color-black)]/50" onClick={onClose} />
      <div
        className={[
          'relative z-10 rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-xl',
          widthClassName,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {title ? (
          <div className="mb-4">
            <h2 className="title-xl text-[var(--color-black)]">{title}</h2>
          </div>
        ) : null}
        <div className="mb-4">{children}</div>
        {actionChildren ? <div className="flex gap-2">{actionChildren}</div> : null}
        <button
          aria-label="Close"
          className="absolute right-4 top-4 p-1 rounded-md hover:bg-[var(--bg-tint)]"
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;
