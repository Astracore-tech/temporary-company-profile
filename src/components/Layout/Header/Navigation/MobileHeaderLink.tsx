import { useState } from 'react';
import Link from 'next/link';
import { HeaderItem } from '../../../../types/menu';
import { usePathname } from 'next/navigation';

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    if (item.submenu) {
      e.preventDefault();
      setSubmenuOpen(!submenuOpen);
    }
  };

  const path = usePathname();
  const isActive = path === item.href || 
    (path.startsWith("/blog") && item.href === "/blog") || 
    (path.startsWith("/portfolio") && item.href === "/portfolio");

  return (
    <div className="relative block w-full border-b border-[var(--ac-line)]">
      <Link
        href={item.href}
        onClick={handleToggle}
        className={`flex items-center justify-between w-full py-4 px-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors focus:outline-hidden ${
          isActive ? 'text-[var(--ac-accent)]' : 'text-[var(--ac-ink-3)] hover:text-[var(--ac-ink)]'
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" className="opacity-60">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className="bg-[var(--ac-surface-2)] w-full px-2 py-1">
          {item.submenu.map((subItem, index) => {
            const isSubActive = path === subItem.href;
            return (
              <Link
                key={index}
                href={subItem.href}
                className={`block py-3 px-4 text-[10px] font-semibold tracking-wider uppercase ${
                  isSubActive ? 'text-[var(--ac-accent)]' : 'text-[var(--ac-ink-3)] hover:text-[var(--ac-ink)]'
                }`}
              >
                {subItem.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;

