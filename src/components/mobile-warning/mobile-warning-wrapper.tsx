'use client';

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { MobileWarning } from './mobile-warning';

export const MobileWarningWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  if (isMobile) return <MobileWarning />;

  return <>{children}</>;
};
