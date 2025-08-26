'use client';

import PhoneInput from '@/components/ui/PhoneInput';
import SelectCard from '@/components/ui/SelectCard';
import { useState } from 'react';

const Page = () => {
  const [selectedPostedBy, setSelectedPostedBy] = useState('');
  return (
    <div className="flex justify-center min-h-screen w-full bg-gray-50">
      <div className="flex flex-col gap-6 w-full max-w-[39.375rem] mt-[2.5rem]">
        <div className="flex flex-col gap-6">
          <div className="title-xl ">Listing posted by</div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-center items-center gap-4">
              <SelectCard
                title="Owner"
                selected={selectedPostedBy === 'owner'}
                onClick={() => setSelectedPostedBy('owner')}
              />
              <SelectCard
                title="Agency"
                selected={selectedPostedBy === 'agency'}
                onClick={() => setSelectedPostedBy('agency')}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <div className="title-xl">Add your contact info</div>
            <div className="body-lg text-[var(--text-body-tint)]">
              Make sure these details are correct, clients will reach out to you using them
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="body-md text-[var(--color-black)]">Contact person</div>
                <div className="body-md font-medium text-[var(--error)]">*</div>
              </div>
              <div className="flex items-center border border-[var(--border)] rounded-[8px] px-4 py-3">
                <input
                  type="text"
                  className="w-full outline-none placeholder:text-[var(--text-body-tint)] body-lg text-[var(--color-black)]"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="flex-1">
              <PhoneInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
