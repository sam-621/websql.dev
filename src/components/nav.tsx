'use client';

import { cn } from '@/lib/utils';
import { DatabaseIcon, TableIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip } from './ui/tooltip';

export const Nav = () => {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isTableViewer = pathname === '/table-viewer';

  return (
    <aside className="bg-muted w-fit border-r flex-col justify-between hidden md:flex">
      <nav className="flex flex-col items-center gap-6 p-3">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={39} height={39} />
        </Link>
        <div className="flex flex-col gap-3">
          <Tooltip content="Connections" side="right">
            <Link href="/" className={cn('p-3 rounded-full', isHome && 'bg-muted-foreground/10')}>
              <DatabaseIcon size={24} className="text-muted-foreground" />
            </Link>
          </Tooltip>
          <Tooltip content="Table Viewer" side="right">
            <Link
              href="/table-viewer"
              className={cn('p-3 rounded-full', isTableViewer && 'bg-muted-foreground/10')}
            >
              <TableIcon size={24} className="text-muted-foreground" />
            </Link>
          </Tooltip>
        </div>
      </nav>
      <div className="p-3 flex justify-center">
        <a href="https://github.com/sam-621/websql.dev" target="_blank">
          <Image src="/github.svg" width={32} height={32} alt="Github logo" priority />
        </a>
      </div>
    </aside>
  );
};
