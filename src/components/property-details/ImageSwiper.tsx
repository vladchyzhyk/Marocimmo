'use client';

import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { ArrowNextIcon, ArrowRightIcon, Favorite, Share } from '@/utils/icons';
import { user } from '@/components/Header';
import type { Property } from '@/types/propery-details';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

interface ImageSwiperProps {
  images: string[];
  initialSlide?: number;
  onClose: () => void;
  property?: Property;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onShareClick?: () => void;
  onAuthRequired?: () => void;
}

export default function ImageSwiper({
  images,
  initialSlide = 0,
  onClose,
  isFavorite = false,
  onFavoriteClick,
  onShareClick,
  onAuthRequired,
}: ImageSwiperProps) {
  const [isFav, setIsFav] = useState(isFavorite);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const handleBackClick = () => {
    onClose();
  };

  const handleFavoriteClick = () => {
    if (user.isLoggedIn) {
      setIsFav(!isFav);
      onFavoriteClick?.();
    } else {
      onAuthRequired?.();
    }
  };

  useEffect(() => {
    if (mainSwiperRef.current && prevButtonRef.current && nextButtonRef.current) {
      const swiper = mainSwiperRef.current;
      if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
        swiper.params.navigation.prevEl = prevButtonRef.current;
        swiper.params.navigation.nextEl = nextButtonRef.current;
      }
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [images]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <button
        onClick={handleBackClick}
        className="absolute top-2 left-2 z-20 w-12 h-12 flex items-center justify-center px-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:bg-gray-50 transition-colors"
        aria-label="Go back"
      >
        <ArrowNextIcon className="w-6 h-6 text-[var(--color-black)] rotate-180" />
      </button>

      <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
        {onShareClick && (
          <button
            onClick={onShareClick}
            className="w-12 h-12 flex items-center justify-center px-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:bg-gray-50 transition-colors"
            aria-label="Share property"
          >
            <Share className="w-6 h-6 text-[var(--color-black)]" />
          </button>
        )}
        {onFavoriteClick && (
          <button
            onClick={handleFavoriteClick}
            className="w-12 h-12 flex items-center justify-center px-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:bg-gray-50 transition-colors"
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Favorite
              className={`w-6 h-6 ${isFav ? 'fill-[var(--accent-green)] stroke-[var(--accent-green)]' : 'fill-white stroke-[var(--color-black)]'}`}
            />
          </button>
        )}
      </div>

      <div className="flex flex-col h-full pb-48 relative">
        <button
          ref={prevButtonRef}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 flex items-center justify-center px-2 bg-white/40 hover:bg-white/50 rounded-[40px] transition-colors"
          aria-label="Previous image"
        >
          <ArrowRightIcon className="w-5 h-5 text-white rotate-180" />
        </button>

        <button
          ref={nextButtonRef}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 flex items-center justify-center px-2 bg-white/40 hover:bg-white/50 rounded-[40px] transition-colors"
          aria-label="Next image"
        >
          <ArrowRightIcon className="w-5 h-5 text-white" />
        </button>

        <Swiper
          modules={[Navigation, Thumbs, Pagination]}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          initialSlide={initialSlide}
          className="flex-1 w-full py-4"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="relative w-full h-full ">
                <Image
                  src={image}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === initialSlide}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/60 pt-6 pb-8 flex flex-col items-center gap-4">
          <div className="w-full max-w-fit ">
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode
              watchSlidesProgress
              className="!px-4 [&_.swiper-slide]:w-auto [&_.swiper-slide]:!flex-shrink-0 "
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="!w-20 !h-20 cursor-pointer ">
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className={`object-cover transition-opacity rounded ${
                        index === activeIndex ? 'opacity-100 border-2 border-white' : 'opacity-50'
                      }`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="text-white text-sm pb-2">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}
