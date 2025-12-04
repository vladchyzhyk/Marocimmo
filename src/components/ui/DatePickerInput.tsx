'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Calendar from '@/components/ui/Calendar';

interface DatePickerInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  inputClassName?: string;
}

export const DatePickerInput = ({
  id,
  value,
  onChange,
  label,
  placeholder = 'Enter the date',
  required,
  inputClassName,
}: DatePickerInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDateChange = (nextValue: string) => {
    onChange(nextValue);
    handleClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <Input
        id={id}
        label={label}
        required={required}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        calendar
        onCalendarClick={handleOpen}
        className={inputClassName}
      />

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        widthClassName="max-w-[24.5rem] md:w-[calc(100%-32px)] md:!px-8 !py-6"
      >
        <Calendar
          value={value}
          onChange={handleDateChange}
          onCancel={handleClose}
          showFooter
        />
      </Modal>
    </>
  );
};


