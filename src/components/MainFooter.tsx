import Link from 'next/link';
import { PlusIcon, FacebookIcon, XIcon, InstagramIcon, YoutubeIcon } from '@/utils/icons';
import Button from './ui/Button';

const SocialIcons = () => (
  <div className="flex gap-3">
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-[8px] border border-[var(--border)] bg-white hover:border-[var(--accent-green)] transition-colors"
      aria-label="Facebook"
    >
      <FacebookIcon className="text-[var(--accent-green)]" />
    </a>
    <a
      href="https://x.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-[8px] border border-[var(--border)] bg-white hover:border-[var(--accent-green)] transition-colors"
      aria-label="X (Twitter)"
    >
      <XIcon className="text-[var(--accent-green)]" />
    </a>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-[8px] border border-[var(--border)] bg-white hover:border-[var(--accent-green)] transition-colors"
      aria-label="Instagram"
    >
      <InstagramIcon className="text-[var(--accent-green)]" />
    </a>
    <a
      href="https://youtube.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-[8px] border border-[var(--border)] bg-white hover:border-[var(--accent-green)] transition-colors"
      aria-label="YouTube"
    >
      <YoutubeIcon className="text-[var(--accent-green)]" />
    </a>
  </div>
);

const MainFooter = () => {
  return (
    <footer className="w-full bg-white border-t border-[var(--border)]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[80px]">
        <div className="border-b border-[var(--border)] py-6 md:py-8">
          <div className="flex flex-row md:flex-row items-start md:items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px] bg-[var(--accent-green)]" />
              <span className="title-xl uppercase text-[var(--color-black)]">Marocimmo</span>
            </Link>
            <p className="hidden lg:block body-lg text-[var(--color-black)]">
              All real estate needs in one place
            </p>
            <div className="hidden md:flex lg:hidden">
              <SocialIcons />
            </div>
            <div className="flex md:hidden">
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="border-b border-[var(--border)] py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="grid grid-cols-2 md:flex md:flex-row gap-8 lg:gap-12 flex-1">
              <div className="flex flex-col gap-4">
                <h4 className="title-md text-[var(--color-black)]">Company</h4>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/about"
                    className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--color-black)] hover:text-[var(--accent-green)]"
                  >
                    About us
                  </Link>
                  <Link
                    href="/faq"
                    className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--color-black)] hover:text-[var(--accent-green)]"
                  >
                    FAQ
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="title-md text-[var(--color-black)]">Explore</h4>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/buy"
                    className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--color-black)] hover:text-[var(--accent-green)]"
                  >
                    Buy
                  </Link>
                  <Link
                    href="/short-term-rent"
                    className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--color-black)] hover:text-[var(--accent-green)]"
                  >
                    Short-time Rent
                  </Link>
                  <Link
                    href="/long-term-rent"
                    className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--color-black)] hover:text-[var(--accent-green)]"
                  >
                    Long-time Rent
                  </Link>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                <h4 className="title-md text-[var(--color-black)]">Contacts</h4>
                <div className="flex flex-col gap-2">
                  <p className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--color-black)]">
                    Marocimmo S.A.
                  </p>
                  <p className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--color-black)]">
                    245 Avenue Hassan II,
                  </p>
                  <p className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--color-black)]">
                    Quartier des Orangers, Rabat
                  </p>
                  <p className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--color-black)]">
                    10000, Morocco
                  </p>
                  <Link
                    href="mailto:contact@marocimmo.com"
                    className="text-base font-bold leading-[1.2] tracking-[-0.02em] md:text-base md:font-normal md:leading-[1.4] md:tracking-[0em] text-[var(--accent-green)] hover:underline"
                  >
                    contact@marocimmo.com
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-6">
              <SocialIcons />
              <Link href="/add-property">
                <Button variant="primary" className="w-full">
                  <PlusIcon className="w-4 h-4 text-white fill-white" />
                  <span>Add your property</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="body-md text-[var(--text-body-tint)]">
              All rights reserved 2025 © Marocimmo
            </p>
            <div className="flex gap-4">
              <Link
                href="/privacy-policy"
                className="body-md text-[var(--accent-green)] hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="body-md text-[var(--accent-green)]">|</span>
              <Link
                href="/terms-of-use"
                className="body-md text-[var(--accent-green)] hover:underline"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
