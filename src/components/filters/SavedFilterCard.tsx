'use client';

import { EditIcon, Share, DeleteIcon, Watch } from '@/utils/icons';
import { FilterTip } from './FilterTip';

interface SavedFilterCardProps {
  title: string;
  newCount?: number;
  filterTags: string[];
  updatedAt: string;
  propertyCount: number;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  onViewProperties?: () => void;
}

export const SavedFilterCard = ({
  title,
  newCount,
  filterTags,
  updatedAt,
  propertyCount,
  onEdit,
  onShare,
  onDelete,
  onViewProperties,
}: SavedFilterCardProps) => {
  const handleEdit = () => {
    onEdit?.();
  };

  const handleShare = () => {
    onShare?.();
  };

  const handleDelete = () => {
    onDelete?.();
  };

  const handleViewProperties = () => {
    onViewProperties?.();
  };

  return (
    <div className="box-border flex flex-row items-center p-6 w-full max-w-[848px] h-[180px] bg-white border border-[#E5E5E5] rounded-lg flex-none self-stretch flex-grow-0">
      <div className="flex flex-col justify-between items-start p-0 gap-6 w-full h-[132px] flex-none self-stretch flex-grow-1">
        <div className="flex flex-row items-start p-0 gap-4 w-full h-[57px] flex-none self-stretch flex-grow-0">
          <div className="flex flex-col items-start p-0 gap-2 w-full max-w-[672px] h-[57px] flex-none flex-grow-1">
            <div className="flex flex-row items-center p-0 gap-2 w-full h-[21px] flex-none self-stretch flex-grow-0">
              <h3 className="w-auto h-[19px] title-md text-[#222222] flex items-center tracking-[-0.02em] flex-none flex-grow-0">
                {title}
              </h3>
              {newCount !== undefined && newCount > 0 && (
                <div className="flex flex-row justify-center items-center py-1 px-2 gap-2 w-auto h-[21px] bg-[#498C28] rounded-lg flex-none flex-grow-0">
                  <span className="w-auto h-[13px] label-sm-medium text-white flex items-center flex-none flex-grow-0">
                    {newCount} new
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center p-0 gap-2 w-full max-w-[302px] h-[28px] flex-none flex-grow-0">
              {filterTags.map((tag, index) => (
                <FilterTip key={index} text={tag} onClear={() => {}} />
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center p-0 gap-2 w-auto h-8 flex-none flex-grow-0">
            <button
              type="button"
              onClick={handleEdit}
              className="box-border flex flex-row justify-center items-center px-2 py-0 gap-2 w-8 h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex-none flex-grow-0 hover:opacity-70 transition-opacity"
              aria-label="Edit filter"
            >
              <EditIcon className="w-5 h-5 text-[#222222] flex-none flex-grow-0" />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="box-border flex flex-row justify-center items-center px-2 py-0 gap-2 w-8 h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex-none flex-grow-0 hover:opacity-70 transition-opacity"
              aria-label="Share filter"
            >
              <Share className="w-5 h-5 text-[#222222] flex-none flex-grow-0" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="box-border flex flex-row justify-center items-center px-2 py-0 gap-2 w-8 h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex-none flex-grow-0 hover:opacity-70 transition-opacity"
              aria-label="Delete filter"
            >
              <DeleteIcon className="w-5 h-5 text-[#222222] flex-none flex-grow-0" />
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center p-0 gap-2 w-full h-8 flex-none self-stretch flex-grow-0">
          <div className="flex flex-row items-center p-0 gap-2 w-auto h-5 flex-none flex-grow-0">
            <Watch className="w-4 h-4 text-[#222222] flex-none flex-grow-0" />
            <span className="w-auto h-5 body-md text-[#222222] flex items-center flex-none flex-grow-0">
              {updatedAt}
            </span>
          </div>
          <div className="flex flex-row items-center p-0 gap-1 w-auto h-8 flex-none flex-grow-0">
            <button
              type="button"
              onClick={handleViewProperties}
              className="flex flex-row justify-center items-center py-2 px-4 gap-2 w-auto h-8 bg-[#498C28] rounded-lg flex-none flex-grow-0 hover:opacity-90 transition-opacity"
              aria-label={`View ${propertyCount} properties`}
            >
              <span className="w-auto h-5 body-md text-white flex-none flex-grow-0 whitespace-nowrap">
                {propertyCount} Properties
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
