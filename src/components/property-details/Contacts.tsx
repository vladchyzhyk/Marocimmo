'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { LocationIcon, PhoneIcon, WhatsAppIcon, EmailIcon } from '@/utils/icons';
import { formatPrice } from '@/utils/propertyFormatters';
import Button from '../ui/Button';
import { AgentInfo, SimilarProperty } from '@/types/propery-details';

interface ContactsProps {
  agent: AgentInfo;
  similarProperties: SimilarProperty[];
  onShowContact?: () => void;
  onViewAllProperties?: () => void;
}

const PropertyPreview = ({ property }: { property: SimilarProperty }) => {
  const formattedPrice = formatPrice(property.price, property.currency);

  return (
    <Link
      href={property.url}
      className="flex flex-row items-start gap-2 w-full hover:opacity-80 transition-opacity"
    >
      <div className="relative shrink-0 w-[100px] h-[56px] rounded overflow-hidden bg-[var(--bg-tint)]">
        <Image
          src={property.mainImage || '/images/light-styled-interior.jpg'}
          alt={property.title}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>
      <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
        <div className="flex flex-col items-start gap-1 w-full">
          <h4 className="label-md-medium text-[var(--color-black)] line-clamp-1">
            {property.title}
          </h4>
          <div className="flex flex-row items-center gap-1 w-full">
            <LocationIcon className="w-4 h-4 shrink-0 fill-[var(--text-pill)]" />
            <span className="body-sm text-[var(--text-pill)] truncate">
              {property.location.fullAddress}
            </span>
          </div>
        </div>
        <div className="title-sm text-[var(--accent-green)]">{formattedPrice}</div>
      </div>
    </Link>
  );
};

export const Contacts = ({
  agent,
  similarProperties,
  onShowContact,
  onViewAllProperties,
}: ContactsProps) => {
  const [showContacts, setShowContacts] = useState(agent.showContactsByDefault);

  const handleShowContact = () => {
    setShowContacts(!showContacts);
    onShowContact?.();
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (agent.contacts.phone) {
      window.location.href = `tel:${agent.contacts.phone}`;
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (agent.contacts.whatsapp) {
      window.open(`https://wa.me/${agent.contacts.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (agent.contacts.email) {
      window.location.href = `mailto:${agent.contacts.email}`;
    }
  };

  return (
    <div className="flex flex-col items-start p-4 gap-6 w-full bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg">
      <div className="flex flex-col md:flex-row lg:flex-col items-start gap-6 w-full">
        <div className="flex flex-row items-start gap-4 w-full">
          <div className="relative shrink-0 w-[72px] h-[72px] rounded-lg overflow-hidden bg-[var(--bg-tint)]">
            {agent.company.logo ? (
              <Image
                src={agent.company.logo}
                alt={agent.company.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[var(--bg-tint)]">
                {agent.company.logoText && (
                  <span className="text-[var(--color-black)] font-medium text-sm">
                    {agent.company.logoText}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start gap-2 flex-1 min-w-0 py-1">
            <div className="flex flex-col items-start  w-full">
              <h4 className="title-lg text-[var(--color-black)]">{agent.name}</h4>
              <span className="body-md text-[var(--text-pill)]">{agent.title}</span>
            </div>
            <span className="label-md-medium text-[var(--accent-green)]">{agent.company.name}</span>
          </div>
        </div>
        {showContacts ? (
          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            {agent.contacts.phone && (
              <button
                type="button"
                onClick={handlePhoneClick}
                className="flex items-center justify-center gap-2 pl-2 pr-4 h-8 bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg hover:opacity-80 transition-opacity"
              >
                <PhoneIcon className="w-4 h-4 text-[var(--accent-green)]" />
                <span className="text-base leading-[140%] text-[var(--color-black)]">
                  {agent.contacts.phone}
                </span>
              </button>
            )}
            {agent.contacts.whatsapp && (
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center w-8 h-8 p-2 bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg hover:opacity-80 transition-opacity"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </button>
            )}
            {agent.contacts.email && (
              <button
                type="button"
                onClick={handleEmailClick}
                className="flex items-center justify-center w-8 h-8 p-2 bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg hover:opacity-80 transition-opacity"
              >
                <EmailIcon className="w-5 h-5 text-[var(--text-body-tint)]" />
              </button>
            )}
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            label="Show contact"
            fullWidth={false}
            onClick={handleShowContact}
            className="!w-full md:!w-[150px] lg:!w-full"
          />
        )}
      </div>

      <div className="w-full h-px border-t border-[var(--border)]" />

      <h3 className="button-lg-medium text-[var(--color-black)] w-full">Other properties</h3>

      <div className="flex flex-col items-start gap-4 w-full">
        {similarProperties.slice(0, 3).map((property) => (
          <PropertyPreview key={property.id} property={property} />
        ))}
      </div>

      <div className="w-full h-px border-t border-[var(--border)]" />

      <div className="flex flex-col items-center px-0 py-2 pb-6 gap-2 w-full bg-[var(--bg-tint)]">
        <button
          onClick={onViewAllProperties}
          className="title-sm text-[var(--accent-green)] hover:underline"
          type="button"
        >
          View all saved properties
        </button>
      </div>
    </div>
  );
};
