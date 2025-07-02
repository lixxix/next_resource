// app/components/PageviewTracker.tsx
"use client";

import { analytics } from '@/firebase';
import { logEvent } from 'firebase/analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const trackView = async () => {
      const an = await analytics;
      if (an) {
        const url = pathname + searchParams.toString();
        logEvent(an, 'page_view', {
          page_location: url,
          page_path: pathname,
        });
      }
    };

    trackView();
  }, [pathname, searchParams]);

  return null;
}