'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';
import classNames from 'classnames';

interface FilterDropdownProps {
  trigger: ReactNode;
  content: ReactNode;
  onApply?: () => void;
  onClear?: () => void;
  showActions?: boolean;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
  contentClassName?: string;
}

export const FilterDropdown = ({
  trigger,
  content,
  onApply,
  onClear,
  showActions = false,
  placement = 'bottom-start',
  className = '',
  contentClassName = '',
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && dropdownRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdown = dropdownRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const spaceRight = viewportWidth - rect.right;
      const spaceLeft = rect.left;
      const spaceBottom = viewportHeight - rect.bottom;
      const spaceTop = rect.top;

      if (placement.includes('bottom') && spaceBottom < 300 && spaceTop > spaceBottom) {
        dropdown.style.top = `${rect.top - dropdown.offsetHeight - 8}px`;
        dropdown.style.bottom = 'auto';
      } else {
        dropdown.style.top = `${rect.bottom + 8}px`;
        dropdown.style.bottom = 'auto';
      }

      if (placement.includes('end') && spaceRight < 200 && spaceLeft > spaceRight) {
        dropdown.style.left = `${rect.right - dropdown.offsetWidth}px`;
        dropdown.style.right = 'auto';
      } else if (placement.includes('start')) {
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.right = 'auto';
      }
    }
  }, [isOpen, placement]);

  const handleApply = () => {
    onApply?.();
    setIsOpen(false);
  };

  const handleClear = () => {
    onClear?.();
    setIsOpen(false);
  };

  const dropdownContent = isOpen && (
    <div
      ref={dropdownRef}
      className={classNames(
        'fixed bg-white border border-[var(--border-input)] rounded-[8px] shadow-lg',
        contentClassName,
      )}
      style={{ zIndex: 1000 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4">{content}</div>
      {showActions && (onApply || onClear) && (
        <div className="flex w-full items-center justify-end gap-2 px-4 pb-4 pt-4 ">
          {onClear && (
            <Button
              variant="outline"
              size="md"
              fullWidth={false}
              className="!w-auto !px-4"
              onClick={handleClear}
            >
              Clear
            </Button>
          )}
          {onApply && (
            <Button variant="primary" size="lg" fullWidth={true} className="" onClick={handleApply}>
              Apply
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={classNames('relative', className)} ref={containerRef}>
        <div onClick={handleToggle} className="w-full">
          {trigger}
        </div>
      </div>
      {isOpen && typeof window !== 'undefined' && createPortal(dropdownContent, document.body)}
    </>
  );
};
