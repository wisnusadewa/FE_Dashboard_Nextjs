'use client';

import { AppDispatch } from '@/app/store';
import { loginRedux } from '@/app/store/slice/userSlice';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ArticlesIdLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center">
      <Navbar classNameNavbar="border" />
      <main className="400">{children}</main>
      <Footer />
    </div>
  );
};

export default ArticlesIdLayout;
