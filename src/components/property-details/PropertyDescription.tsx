'use client';

import { useState } from 'react';
import { getDescriptionPreview, hasMoreText } from '@/utils/propertyFormatters';

interface PropertyDescriptionProps {
  description: string;
  previewLength?: number;
}

export default function PropertyDescription({
  description,
  previewLength = 150,
}: PropertyDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowReadMore = hasMoreText(description, previewLength);
  const displayText = isExpanded ? description : getDescriptionPreview(description, previewLength);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="title-lg text-[var(--color-black)]">About this property</h2>
      <p className="body-lg text-[var(--text-pill)]">{displayText}</p>
      {shouldShowReadMore && (
        <button
          onClick={handleToggle}
          className="title-sm text-[var(--accent-green)] w-fit cursor-pointer hover:opacity-80 transition-opacity"
          aria-label={isExpanded ? 'Read less' : 'Read more'}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
