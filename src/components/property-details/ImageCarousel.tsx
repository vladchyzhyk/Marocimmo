'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ImageSwiper from './ImageSwiper';
import { SharePropertyDialog } from '../SharePropertyDialog';
import { ReportPropertyDialog } from '../ReportPropertyDialog';
import { AuthModal } from '../AuthModal';
import { ArrowNextIcon, Favorite, Share, ReportIcon } from '@/utils/icons';
import { user } from '@/components/Header';
import type { Property } from '@/types/propery-details';

interface ImageCarouselProps {
  images: string[];
  property?: Property;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
}

export default function ImageCarousel({
  images,
  property,
  isFavorite = false,
  onFavoriteClick,
}: ImageCarouselProps) {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSwiperOpen, setIsSwiperOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFav, setIsFav] = useState(isFavorite);

  if (!images || images.length === 0) {
    return null;
  }

  const mainImage = images[0];
  const image1 = images[1];
  const image2 = images[2];
  const image3 = images[3];
  const image4 = images[4];
  const mdRemainingCount = images.length - 3;
  const lgRemainingCount = images.length - 5;
  const hasMoreImagesMd = mdRemainingCount > 0;
  const hasMoreImagesLg = lgRemainingCount > 0;

  const handleMainImageClick = () => {
    setSelectedImageIndex(0);
    setIsSwiperOpen(true);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsSwiperOpen(true);
  };

  const handleViewAllClick = () => {
    setSelectedImageIndex(0);
    setIsSwiperOpen(true);
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleShareClick = () => {
    setIsShareDialogOpen(true);
  };

  const handleReportClick = () => {
    setIsReportDialogOpen(true);
  };

  const handleFavoriteClick = () => {
    if (user.isLoggedIn) {
      setIsFav(!isFav);
      onFavoriteClick?.();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const shareUrl = property?.id
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/property/${property.id}`
    : typeof window !== 'undefined'
      ? window.location.href
      : '';

  return (
    <>
      <div className="relative w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 md:grid-rows-2 gap-2 h-[300px] md:h-[400px] lg:h-[400px] overflow-hidden">
        <button
          onClick={handleBackClick}
          className="absolute top-2 left-2 z-20 w-12 h-12 flex items-center justify-center px-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:bg-gray-50 transition-colors"
          aria-label="Go back"
        >
          <ArrowNextIcon className="w-6 h-6 text-[var(--color-black)] rotate-180" />
        </button>

        <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
          <button
            onClick={handleReportClick}
            className="w-12 h-12 flex items-center justify-center px-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:bg-gray-50 transition-colors"
            aria-label="Report property"
          >
            <ReportIcon className="w-6 h-6" />
          </button>
          <button
            onClick={handleShareClick}
            className="w-12 h-12 flex items-center justify-center px-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:bg-gray-50 transition-colors"
            aria-label="Share property"
          >
            <Share className="w-6 h-6 text-[var(--color-black)]" />
          </button>
          <button
            onClick={handleFavoriteClick}
            className="w-12 h-12 flex items-center justify-center px-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:bg-gray-50 transition-colors"
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Favorite
              className={`w-6 h-6 ${isFav ? 'fill-[var(--accent-green)] stroke-[var(--accent-green)]' : 'fill-white stroke-[var(--color-black)]'}`}
            />
          </button>
        </div>

        <div
          className="relative w-full h-full cursor-pointer group overflow-hidden md:row-span-2 md:col-span-2 lg:row-span-2 lg:col-span-2"
          onClick={handleMainImageClick}
        >
          <Image
            src={mainImage}
            alt="Main property image"
            fill
            className="object-cover transition-transform group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/0 md:bg-black/20 lg:bg-black/20 group-hover:bg-black/10 md:group-hover:bg-black/30 lg:group-hover:bg-black/30 transition-colors" />
        </div>

        {image1 && (
          <div
            className="hidden md:block relative w-full h-full cursor-pointer group overflow-hidden md:col-start-3 lg:col-start-3"
            onClick={() => handleImageClick(1)}
          >
            <Image
              src={image1}
              alt="Property image 1"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          </div>
        )}

        {image2 && !hasMoreImagesMd && (
          <div
            className="hidden md:block relative w-full h-full cursor-pointer group overflow-hidden md:col-start-3 md:row-start-2 lg:col-start-2 lg:row-start-2"
            onClick={() => handleImageClick(2)}
          >
            <Image
              src={image2}
              alt="Property image 2"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          </div>
        )}

        {hasMoreImagesMd && (
          <div
            className="hidden md:block lg:hidden relative w-full h-full cursor-pointer group overflow-hidden md:col-start-3 md:row-start-2"
            onClick={handleViewAllClick}
          >
            {image2 ? (
              <Image
                src={image2}
                alt="More images"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="body-lg flex flex-row ">
                <p className="text-white">+{mdRemainingCount} more</p>
              </div>
            </div>
          </div>
        )}

        {image2 && (
          <div
            className="hidden lg:block relative w-full h-full cursor-pointer group overflow-hidden lg:col-start-3 lg:row-start-2"
            onClick={() => handleImageClick(2)}
          >
            <Image
              src={image2}
              alt="Property image 2"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          </div>
        )}

        {image3 && (
          <div
            className="hidden lg:block relative w-full h-full cursor-pointer group overflow-hidden lg:col-start-4"
            onClick={() => handleImageClick(3)}
          >
            <Image
              src={image3}
              alt="Property image 3"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          </div>
        )}

        {image4 && !hasMoreImagesLg && (
          <div
            className="hidden lg:block relative w-full h-full cursor-pointer group overflow-hidden lg:col-start-4 lg:row-start-2"
            onClick={() => handleImageClick(4)}
          >
            <Image
              src={image4}
              alt="Property image 4"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          </div>
        )}

        {hasMoreImagesLg && (
          <div
            className="hidden lg:block relative w-full h-full cursor-pointer group overflow-hidden lg:col-start-4 lg:row-start-2"
            onClick={handleViewAllClick}
          >
            {image4 ? (
              <Image
                src={image4}
                alt="More images"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="body-lg flex flex-row ">
                <p className="text-white">+{lgRemainingCount} more</p>
              </div>
            </div>
          </div>
        )}

        {!image2 && !hasMoreImagesMd && (
          <div className="hidden md:block lg:hidden relative w-full h-full bg-gray-100 md:col-start-3 md:row-start-2" />
        )}

        {images.length > 1 && (
          <button
            onClick={handleViewAllClick}
            className="hidden md:block absolute bottom-2 right-2 lg:bottom-2 lg:right-2 px-4 py-2 bg-white/90 hover:bg-white backdrop-blur-sm text-sm font-medium transition-colors shadow-lg z-10 rounded-lg body-lg"
          >
            View all {images.length} photos
          </button>
        )}
      </div>

      {isSwiperOpen && (
        <ImageSwiper
          images={images}
          initialSlide={selectedImageIndex}
          onClose={() => setIsSwiperOpen(false)}
          property={property}
          isFavorite={isFav}
          onFavoriteClick={() => {
            setIsFav(!isFav);
            onFavoriteClick?.();
          }}
          onShareClick={handleShareClick}
          onAuthRequired={() => setIsAuthModalOpen(true)}
        />
      )}

      {property && (
        <SharePropertyDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          property={{
            title: property.basicInfo.title,
            location: property.basicInfo.location.fullAddress,
            price: property.pricing.price,
            currency: property.pricing.currency,
            image: images[0] || '',
            url: shareUrl,
          }}
        />
      )}

      <ReportPropertyDialog
        isOpen={isReportDialogOpen}
        onClose={() => setIsReportDialogOpen(false)}
        propertyId={property?.id}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signin"
      />
    </>
  );
}
