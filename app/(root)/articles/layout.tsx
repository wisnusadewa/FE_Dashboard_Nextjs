'use client';

import { AppDispatch } from '@/app/store';
import { loginRedux } from '@/app/store/slice/userSlice';
import AppSidebar from '@/components/sidebar/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ArticlesLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // jika ada token dari localstorage => masukkan ke redux
  useEffect(() => {
    const token = localStorage.getItem('token');
    const roleFromStorage = localStorage.getItem('role');

    if (!token || !roleFromStorage) {
      router.replace('/login');
    } else {
      dispatch(loginRedux({ token, role: roleFromStorage }));
      setRole(roleFromStorage);
    }
    setLoading(false);
  }, [dispatch, router]);

  if (loading) return <p>loading...</p>;

  return (
    <>
      {role === 'Admin' ? (
        // role Admin dengan Sidebar
        <SidebarProvider className="flex">
          <AppSidebar />
          <main className="w-full">
            {/* <SidebarTrigger className="cursor-pointer" /> */}
            {children}
          </main>
        </SidebarProvider>
      ) : (
        // role User tanpa sidebar
        <main className="">{children}</main>
      )}
    </>
  );
};

export default ArticlesLayout;
