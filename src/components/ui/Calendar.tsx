import Button from '@/components/ui/Button'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

type CalendarProps = {
  id?: string;
  label?: string;
  value?: string; // ISO yyyy-mm-dd (single mode)
  onChange?: (value: string) => void;
  mode?: 'single' | 'range';
  rangeValue?: { start: string; end: string };
  onRangeChange?: (value: { start: string; end: string }) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
};

function formatISO(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function parseISO(iso: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

const weekdayLabels = [
  { label: 'M', short: 'Mo', value: 'Monday' },
  { label: 'T', short: 'Tu', value: 'Tuesday' },
  { label: 'W', short: 'We', value: 'Wednesday' },
  { label: 'T', short: 'Th', value: 'Thursday' },
  { label: 'F', short: 'Fr', value: 'Friday' },
  { label: 'S', short: 'Sa', value: 'Saturday' },
  { label: 'S', short: 'Su', value: 'Sunday' },
];

const Calendar = ({
  id,
  label,
  value,
  onChange,
  mode = 'single',
  rangeValue,
  onRangeChange,
  required = false,
  className = '',
  disabled = false,
  showFooter = true,
  confirmText = 'Apply',
  cancelText = 'Cancel',
  onCancel,
}: CalendarProps) => {
  const selectedDate = React.useMemo(() => (value ? parseISO(value) : null), [value]);
  const selectedRangeStart = React.useMemo(
    () => (rangeValue?.start ? parseISO(rangeValue.start) : null),
    [rangeValue?.start],
  );
  const selectedRangeEnd = React.useMemo(
    () => (rangeValue?.end ? parseISO(rangeValue.end) : null),
    [rangeValue?.end],
  );

  const [viewDate, setViewDate] = React.useState<Date>(
    () => selectedDate ?? selectedRangeStart ?? new Date(),
  );
  const [pendingSingle, setPendingSingle] = React.useState<Date | null>(selectedDate ?? null);
  const [pendingRangeStart, setPendingRangeStart] = React.useState<Date | null>(
    selectedRangeStart ?? null,
  );
  const [pendingRangeEnd, setPendingRangeEnd] = React.useState<Date | null>(
    selectedRangeEnd ?? null,
  );

  const goPrevMonth = () => {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const goNextMonth = () => {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const endOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

  // Calculate leading blanks (Mon-first calendar per Figma-like)
  const startWeekday = (startOfMonth.getDay() + 6) % 7; // 0..6 for Mon..Sun
  const daysInMonth = endOfMonth.getDate();

  // Build calendar grid days including previous/next month to fill weeks
  const days: Date[] = [];
  // Leading days from previous month
  for (let i = startWeekday; i > 0; i -= 1) {
    days.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), 1 - i));
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d += 1) {
    days.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
  }
  // Trailing days from next month to complete the last week
  const totalCells = Math.ceil(days.length / 7) * 7;
  for (let i = 1; days.length < totalCells; i += 1) {
    days.push(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, i));
  }

  const handlePick = (d: Date) => {
    if (mode === 'single') {
      setPendingSingle(d);
      return;
    }
    if (!pendingRangeStart || (pendingRangeStart && pendingRangeEnd)) {
      setPendingRangeStart(d);
      setPendingRangeEnd(null);
      return;
    }
    if (pendingRangeStart && !pendingRangeEnd) {
      if (d < pendingRangeStart) {
        setPendingRangeStart(d);
      } else {
        setPendingRangeEnd(d);
      }
    }
  };

  const applySelection = () => {
    if (mode === 'single') {
      if (pendingSingle && onChange) onChange(formatISO(pendingSingle));
      if (pendingSingle) setViewDate(pendingSingle);
      return;
    }
    if (pendingRangeStart && pendingRangeEnd && onRangeChange) {
      onRangeChange({ start: formatISO(pendingRangeStart), end: formatISO(pendingRangeEnd) });
      setViewDate(pendingRangeStart);
    }
  };

  const cancelSelection = () => {
    setPendingSingle(selectedDate ?? null);
    setPendingRangeStart(selectedRangeStart ?? null);
    setPendingRangeEnd(selectedRangeEnd ?? null);
    onCancel?.();
  };

  const monthLabel = new Intl.DateTimeFormat('en', { month: 'long' }).format(viewDate);

  const yearLabel = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(viewDate);

  return (
    <div className={['flex flex-col gap-2 w-full', className].filter(Boolean).join(' ')}>
      {label ? (
        <label htmlFor={id} className="body-md text-[var(--color-black)]">
          {label}
          {required ? (
            <span className="ml-1 font-medium text-[var(--error)]" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="w-full h-full flex flex-col gap-6 md:gap-4 bg-white">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Button
              className="flex items-center justify-center max-w-[2.5rem] max-h-[2.5rem] !p-0"
              variant="outline"
              onClick={goPrevMonth}
              aria-label="Previous month"
            >
              <Image
                src="/icons/ic_arrow_right.svg"
                alt="prev"
                width={20}
                height={20}
                className="rotate-180"
              />
            </Button>
            <div className="flex items-center gap-2 title-md text-[var(--color-black)]">
              {monthLabel} <span className="text-[var(--text-body-tint)]">{yearLabel}</span>
            </div>
            <Button
              className="flex items-center justify-center max-w-[2.5rem] max-h-[2.5rem] !p-0"
              variant="outline"
              onClick={goNextMonth}
              aria-label="Next month"
            >
              <Image src="/icons/ic_arrow_right.svg" alt="next" width={20} height={20} />
            </Button>
          </div>
          <div className="w-full h-full flex flex-col gap-1">
            <div className="flex gap-1 justify-between items-center">
              {weekdayLabels.map((w) => (
                <div
                  key={w.value}
                  className="flex items-center justify-center w-8 h-8 md:w-7 md:h-7 button-lg-medium text-center text-[var(--accent-green)]"
                >
                  {w.label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-x-3 gap-y-1">
              {days.map((d, idx) => {
                const isOutsideMonth = d.getMonth() !== viewDate.getMonth();

                const selSingle = pendingSingle;
                const selStart = pendingRangeStart;
                const selEnd = pendingRangeEnd;

                let isSelected = false;
                let isInRange = false;
                if (mode === 'single') {
                  isSelected =
                    !!selSingle && !isOutsideMonth && d.toDateString() === selSingle.toDateString();
                } else {
                  const t = d.getTime();
                  if (selStart && selEnd) {
                    const a = selStart.getTime();
                    const b = selEnd.getTime();
                    isInRange = !isOutsideMonth && t > Math.min(a, b) && t < Math.max(a, b);
                    isSelected = !isOutsideMonth && (t === a || t === b);
                  } else if (selStart && !selEnd) {
                    isSelected = !isOutsideMonth && d.toDateString() === selStart.toDateString();
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePick(d)}
                    className={classNames(
                      'h-8 w-8 rounded-md text-center button-lg-medium transition-colors border',
                      {
                        'text-[var(--text-body-tint)] border-transparent': isOutsideMonth,
                        'opacity-40 cursor-not-allowed border-transparent':
                          !isOutsideMonth && disabled,
                        'bg-transparent text-[var(--accent-green)] border-[var(--accent-green)]':
                          !isOutsideMonth && !disabled && isSelected,
                        'bg-[var(--bg-tint)] text-[var(--color-black)] border-transparent':
                          !isOutsideMonth && !disabled && isInRange,
                      },
                      !isOutsideMonth && !disabled && !isSelected && !isInRange
                        ? 'hover:bg-[var(--bg-tint)] text-[var(--color-black)] border-transparent'
                        : '',
                    )}
                    disabled={disabled || isOutsideMonth}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {showFooter ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 max-w-[5.5rem]">
              <Button variant="outline" onClick={cancelSelection}>
                {cancelText}
              </Button>
            </div>
            <div className="flex-1 max-w-[5.5rem]">
              <Button variant="primary" onClick={applySelection}>
                {confirmText}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Calendar;
