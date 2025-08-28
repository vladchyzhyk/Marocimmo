'use client';

import classNames from 'classnames';
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actionChildren?: React.ReactNode;
  className?: string;
  widthClassName?: string;
  textCenter?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actionChildren,
  className = '',
  widthClassName = 'w-[calc(100%-32px)]',
  textCenter = false,
}: ModalProps) => {
  return (
    <div
      className={classNames(
        'fixed inset-0 z-[90] flex items-center justify-center transition-all duration-300 ease-out',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={classNames(
          'absolute inset-0 min-h-screen bg-[var(--color-black)]/50 z-[50] transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <div
        className={classNames(
          'flex flex-col gap-4 relative rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-xl z-[100] transition-all duration-300 ease-out origin-center',
          widthClassName,
          className,
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4',
        )}
      >
        {title ? (
          <div className="">
            <h2
              className={classNames(
                'title-xl text-[var(--color-black)]',
                textCenter ? 'text-center' : '',
              )}
            >
              {title}
            </h2>
          </div>
        ) : null}
        <div className="">{children}</div>
        {actionChildren ? <div className="flex gap-2">{actionChildren}</div> : null}
      </div>
    </div>
  );
};

export default Modal;
