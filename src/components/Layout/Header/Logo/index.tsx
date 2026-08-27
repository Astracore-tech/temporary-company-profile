import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImgPath } from '@/utils/image';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group">
      <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={getImgPath('/images/logo/logo-icon.png')}
          alt="Astracore Logo"
          fill
          sizes="32px"
          style={{ objectFit: 'contain' }}
          className="filter drop-shadow-[0_0_10px_rgba(0,229,255,0.25)]"
          priority
        />
      </div>
      <span
        className="text-[var(--ac-ink)] font-extrabold text-xl tracking-tight transition-colors duration-300 group-hover:text-[var(--ac-accent)]"
        style={{ fontFamily: 'Syne, sans-serif' }}>
        Astracoretech
      </span>
    </Link>
  );
};

export default Logo;
