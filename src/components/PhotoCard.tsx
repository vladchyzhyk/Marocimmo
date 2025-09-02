import { CloseIcon } from '@/utils/icons';
import classNames from 'classnames';
import PhotoIndicator from './PhotoIndicator';

type PhotoCardProps = {
  photo: {
    id: string;
    file: File;
    previewUrl: string;
  };
  index: number;
  onRemove: (id: string) => void;
  onReorder: (dragIndex: number, dropIndex: number) => void;
};

const PhotoCard = ({ photo, index, onRemove, onReorder }: PhotoCardProps) => {
  return (
    <div
      className={classNames(
        'relative w-full h-[196px] border rounded-lg overflow-hidden bg-white shadow-sm cursor-move transition-all duration-200 ease-in-out transform',
        index === 0 ? 'border-[var(--accent-green)]' : 'border-[var(--border-input)]',
      )}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', index.toString());
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.classList.add('opacity-50', 'scale-95', 'rotate-1');
      }}
      onDragEnd={(e) => {
        e.currentTarget.classList.remove('opacity-50', 'scale-95', 'rotate-1');
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(e) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
        if (dragIndex !== index) {
          onReorder(dragIndex, index);
        }
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-[var(--accent-green)]', 'border');
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove(
          'border-[var(--accent-green)]',
          'border-2',
          'scale-[1.02]',
        );
      }}
    >
      {/* Use img to support blob: URLs reliably */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.previewUrl}
        alt={photo.file.name}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(photo.id)}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 border border-black/8 flex items-center justify-center z-10 transition-all duration-200 ease-in-out hover:scale-110 hover:bg-red-50 hover:border-red-200"
        aria-label="Remove photo"
      >
        <CloseIcon className="w-6 h-6 text-[var(--color-black)]" />
      </button>

      {/* Photo indicator pill */}
      <div className={classNames('absolute top-3.5', index === 0 ? 'left-0' : 'left-3.5')}>
        <PhotoIndicator index={index} />
      </div>
    </div>
  );
};

export default PhotoCard;
