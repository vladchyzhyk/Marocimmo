import React, { useState } from 'react';
import IconButton from './IconButton';

const IconButtonDemo: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState({
    base: false,
    baseHover: false,
    withPhoto: false,
    withPhotoHover: false,
  });

  const PlusIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const handleLoadingToggle = (key: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-10 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 bg-[#F4F3F0] p-10 rounded-[20px]">
        <div className="text-center">
          <h1 className="text-5xl font-['Anton'] text-[#111617] leading-tight">Buttons Icon</h1>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2.5 p-10">
        {/* State Labels */}
        <div className="flex items-center gap-2.5 pl-[118px]">
          <div className="flex justify-center items-center gap-4 px-4 pb-4 w-[124px]">
            <span className="title-sm text-black">Default</span>
          </div>
          <div className="flex justify-center items-center gap-4 px-4 pb-4 w-[109px]">
            <span className="title-sm text-black">Hover</span>
          </div>
        </div>

        {/* Button Grid */}
        <div className="flex gap-2.5">
          {/* Type Labels */}
          <div className="flex flex-col gap-14 py-8">
            <div className="flex items-center px-4 py-6">
              <span className="title-sm text-black">Base</span>
            </div>
            <div className="flex items-center px-4 py-6">
              <span className="title-sm text-black">With photo</span>
            </div>
          </div>

          {/* Button Container */}
          <div className="relative border border-[#8A38F5] border-dashed rounded-[5px] w-[283px] h-[256px]">
            {/* Base Default */}
            <div className="absolute top-4 left-4">
              <IconButton
                variant="base"
                state="default"
                icon={<PlusIcon />}
                label="Add Logo"
                onClick={() => handleLoadingToggle('base')}
                loading={loadingStates.base}
                className="w-[100px] h-[100px]"
              />
            </div>

            {/* Base Hover */}
            <div className="absolute top-4 left-[142px]">
              <IconButton
                variant="base"
                state="hover"
                icon={<PlusIcon />}
                label="Add Logo"
                onClick={() => handleLoadingToggle('baseHover')}
                loading={loadingStates.baseHover}
                className="w-[100px] h-[100px]"
              />
            </div>

            {/* With Photo Default */}
            <div className="absolute top-[140px] left-4">
              <IconButton
                variant="with-photo"
                state="default"
                icon={<PlusIcon />}
                imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&crop=center"
                onClick={() => handleLoadingToggle('withPhoto')}
                loading={loadingStates.withPhoto}
                className="w-[100px] h-[100px]"
              />
            </div>

            {/* With Photo Hover */}
            <div className="absolute top-[140px] left-[142px]">
              <IconButton
                variant="with-photo"
                state="hover"
                icon={<PlusIcon />}
                imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&crop=center"
                onDelete={() => console.log('Delete clicked')}
                onClick={() => handleLoadingToggle('withPhotoHover')}
                loading={loadingStates.withPhotoHover}
                className="w-[100px] h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconButtonDemo;
