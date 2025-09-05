'use client';

import PhotoCard from '@/components/PhotoCard'
import { UploadIcon } from '@/utils/icons'
import classNames from 'classnames'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type SelectedPhoto = {
  id: string;
  file: File;
  previewUrl: string;
};

interface PhotosData {
  photos: SelectedPhoto[];
}

interface Props {
  onDataChange?: (data: PhotosData) => void;
  initialData?: PhotosData | null;
}

const MAX_PHOTOS = 20;
const MIN_REQUIRED = 3;

const EditPhotosStep = ({ onDataChange, initialData }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<SelectedPhoto[]>(initialData?.photos || []);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (photos !== initialData?.photos) {
      onDataChange?.({ photos });
    }
  }, [photos, onDataChange, initialData?.photos]);

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const allowedExtensions = new Set([
      'jpg',
      'jpeg',
      'png',
      'gif',
      'bmp',
      'webp',
      'heic',
      'heif',
      'tif',
      'tiff',
      'svg',
    ]);
    const incoming = Array.from(fileList).filter((file) => {
      if (file.type && file.type.startsWith('image/')) return true;
      const ext = file.name.split('.').pop()?.toLowerCase();
      return !!ext && allowedExtensions.has(ext);
    });

    setPhotos((prev) => {
      const remainingSlots = Math.max(0, MAX_PHOTOS - prev.length);
      const filesToAdd = incoming.slice(0, remainingSlots);
      const mapped = filesToAdd.map<SelectedPhoto>((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID?.() ?? Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      return [...prev, ...mapped];
    });
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const removePhoto = useCallback((id: string) => {
    setPhotos((prev) => {
      const toRevoke = prev.find((p) => p.id === id);
      if (toRevoke) URL.revokeObjectURL(toRevoke.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const reorderPhotos = useCallback((dragIndex: number, dropIndex: number) => {
    setPhotos((prev) => {
      const newPhotos = [...prev];
      const [draggedPhoto] = newPhotos.splice(dragIndex, 1);
      newPhotos.splice(dropIndex, 0, draggedPhoto);
      return newPhotos;
    });
  }, []);

  const uploadedCountLabel = useMemo(
    () => `${photos.length}/${MAX_PHOTOS} photos uploaded`,
    [photos.length],
  );
  const progressMessage = useMemo(() => {
    if (photos.length === 0) return '';
    if (window.innerWidth > 768) {
      if (photos.length >= MIN_REQUIRED) {
        return `Uploaded ${photos.length} photos`;
      }
      return `Uploaded ${photos.length} of the ${MIN_REQUIRED} required photos`;
    }
    if (photos.length >= MIN_REQUIRED) {
      return ` ${photos.length} Uploaded`;
    }
    return `${photos.length}/${MIN_REQUIRED} Uploaded`;
  }, [photos.length]);

  return (
    <div
      className={classNames(
        'flex flex-col gap-6 md:gap-4 w-full px-4 md:px-3 lg:px-3 xl:px-0 ',
        photos.length > 0 ? 'sm:mb-4' : 'sm:mb-10 md:mb-25',
      )}
    >
      <div className="flex flex-col gap-2 w-full md:max-w-[50rem] lg:max-w-[51rem] xl:max-w-[53rem] mx-auto">
        <h2 className="title-xl text-[var(--color-black)]">Add a few photos of your property</h2>
        <p className="body-md text-[var(--text-body-tint)]">
          To get started, you need to upload 3 photos. (MAX 20)
        </p>
      </div>

      {photos.length === 0 ? (
        <div
          className={[
            'flex flex-col items-center justify-center gap-2 md:gap-2 lg:gap-3 xl:gap-3 border rounded-xl bg-white w-full md:max-w-[50rem] lg:max-w-[51rem] xl:max-w-[53rem] mx-auto',
            'border-dashed py-[4.625rem]',
            'shadow-sm',
            isDragging
              ? 'border-[var(--accent-green)] bg-[var(--accent-green)]/5'
              : 'border-[var(--border-input)]',
          ].join(' ')}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          aria-label="Upload photos"
        >
          <UploadIcon className="w-12 h-12 md:w-10 md:h-10 text-[var(--text-body-tint)]" />
          <h3 className="title-xl text-[var(--color-black)]">Upload Photos</h3>
          <p className="max-w-[80%] md:max-w-full text-center body-md text-[var(--color-black)]">
            Drag and drop photos here, or click to select files
          </p>
          <p className="label-sm-medium text-[var(--text-body-tint)]">{uploadedCountLabel}</p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.webp,.heic,.heif,.tif,.tiff,.svg"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      ) : (
        <>
          {/* Progress and helper text */}
          <div className="flex justify-between items-center w-full max-w-[53rem] mx-auto">
            <p
              className={`body-md ${photos.length < MIN_REQUIRED ? 'text-[var(--error)]' : 'text-[var(--color-black)]'}`}
            >
              {progressMessage}
            </p>
            <p className="hidden md:block body-md text-[var(--color-black)]">
              Drag to change the order of photos
            </p>
            <p className="md:hidden body-md text-[var(--color-black)]">Drag to change the order</p>
          </div>

          {/* Photo grid - Fixed overflow issue by using responsive grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-3 lg:gap-3 xl:gap-3 md:max-w-[50rem] lg:max-w-[51rem] xl:max-w-[53rem] md:min-h-fit mx-auto py-2 pb-25">
            {photos.map((photo, index) => (
              <div key={photo.id} className={index === 0 ? 'col-span-2 md:col-span-1 ' : undefined}>
                <PhotoCard
                  photo={photo}
                  index={index}
                  onRemove={removePhoto}
                  onReorder={reorderPhotos}
                />
              </div>
            ))}

            {/* Add more photos button */}
            {photos.length < MAX_PHOTOS && (
              <div
                className="h-[196px] border border-dashed border-[var(--border-input)] rounded-lg bg-white flex flex-col items-center justify-center gap-2 md:gap-1 lg:gap-2 xl:gap-2 cursor-pointer transition-all duration-200 ease-in-out hover:bg-[var(--bg-tint)] hover:border-[var(--accent-green)] "
                onClick={() => inputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Add more photos"
              >
                <Image
                  src="/icons/ic_plus.svg"
                  alt="add"
                  width={24}
                  height={24}
                  className="transition-transform duration-200 ease-in-out group-hover:scale-110"
                />
                <span className="body-md text-[var(--color-black)] transition-colors duration-200 ease-in-out group-hover:text-[var(--accent-green)]">
                  Add Photo
                </span>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.webp,.heic,.heif,.tif,.tiff,.svg"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </>
      )}

      {photos.length < 1 ? (
        <p className="text-[var(--error)] body-md text-center">
          Please upload at least 3 photos to continue
        </p>
      ) : null}
    </div>
  );
};

export default EditPhotosStep;
