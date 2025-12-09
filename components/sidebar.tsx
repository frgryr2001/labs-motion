'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: 'Transaction List Animation', href: '/transaction-list-animation' },
  { title: 'Feedback', href: '/feedback' },
  { title: 'Inline Table Control', href: '/inline-table-control' },
  { title: 'Magic Wand', href: '/magic-wand' },
  { title: 'Calendar', href: '/calendar' },
  { title: 'Carousel', href: '/carousel' },
  { title: 'Inline Flow', href: '/inline-flow' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card h-screen sticky top-0 flex flex-col font-sans">
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block px-4 py-2 rounded-md text-sm transition-colors font-sans font-medium',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
