'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/articles');
    }
  }, [router]);

  return <div className="min-h-screen flex justify-center items-center">{children}</div>;
};

export default layout;
