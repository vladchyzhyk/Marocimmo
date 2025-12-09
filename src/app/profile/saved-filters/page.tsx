'use client';
import { ArrowNextIcon } from '@/utils/icons';
import { useRouter } from 'next/navigation';
import {
  NoSavedFilters,
  SavedFilterCard,
  EditFilterModal,
  DeleteFilterModal,
} from '@/components/filters';
import SideMenu from '../components/SideMenu';
import { useState, useEffect } from 'react';
import { mockSavedFilters } from '@/utils/mockSavedFilters';
import { deleteFilterFromStorage, getSavedFilters } from '@/utils/savedFiltersStorage';
import { MockSavedFilter } from '@/utils/mockSavedFilters';

export default function SavedFiltersPage() {
  const router = useRouter();
  const [savedFilters, setSavedFilters] = useState<MockSavedFilter[]>(mockSavedFilters);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFilter, setEditingFilter] = useState<{ id: string; title: string } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingFilter, setDeletingFilter] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    const customFilters = getSavedFilters();
    setSavedFilters([...mockSavedFilters, ...customFilters]);
  }, []);

  const handleEdit = (filter: { id: string; title: string }) => {
    setEditingFilter(filter);
    setIsEditModalOpen(true);
  };

  const handleSaveFilterName = (newName: string) => {
    if (editingFilter) {
      const updatedFilters = savedFilters.map((filter) =>
        filter.id === editingFilter.id ? { ...filter, title: newName } : filter,
      );
      setSavedFilters(updatedFilters);
      const customFilters = updatedFilters.filter(
        (f) => !mockSavedFilters.some((mf) => mf.id === f.id),
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedFilters', JSON.stringify(customFilters));
      }
    }
    setIsEditModalOpen(false);
    setEditingFilter(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingFilter(null);
  };

  const handleDelete = (filter: { id: string; title: string }) => {
    setDeletingFilter(filter);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingFilter) {
      const isMockFilter = mockSavedFilters.some((mf) => mf.id === deletingFilter.id);
      if (!isMockFilter) {
        deleteFilterFromStorage(deletingFilter.id);
      }
      const updatedFilters = savedFilters.filter((f) => f.id !== deletingFilter.id);
      setSavedFilters(updatedFilters);
      setIsDeleteModalOpen(false);
      setDeletingFilter(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingFilter(null);
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-4 lg:gap-8 px-4 py-6 md:py-8 mt-[6rem]">
      <div className="flex flex-col gap-8">
        <div className="hidden md:flex flex-col">
          <h1 className="text-[var(--color-black)] title-xl">Profile Settings</h1>
          <p className="body-lg mt-1">Manage your account information and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div
            className="flex md:hidden items-center gap-2 cursor-pointer"
            onClick={() => router.push('/profile')}
          >
            <ArrowNextIcon className="w-6 h-6 rotate-180" />
            <p className="label-md-medium text-[var(--color-black)]">Back to Settings</p>
          </div>
          <div className="hidden md:flex w-full flex-col gap-2 md:max-w-[14.375rem] lg:max-w-[19.375rem]">
            <SideMenu />
          </div>

          <div className="flex-1 flex flex-col gap-6">
            {savedFilters.length === 0 ? (
              <NoSavedFilters />
            ) : (
              <>
                {savedFilters.map((filter) => (
                  <SavedFilterCard
                    key={filter.id}
                    title={filter.title}
                    newCount={filter.newCount}
                    filterQuery={filter.filterQuery}
                    updatedAt={filter.updatedAt}
                    propertyCount={filter.propertyCount}
                    onEdit={() => handleEdit(filter)}
                    onShare={() => {}}
                    onDelete={() => handleDelete(filter)}
                    onViewProperties={() => {}}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <EditFilterModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveFilterName}
        currentFilterName={editingFilter?.title || ''}
      />

      <DeleteFilterModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        filterName={deletingFilter?.title || ''}
      />
    </div>
  );
}
