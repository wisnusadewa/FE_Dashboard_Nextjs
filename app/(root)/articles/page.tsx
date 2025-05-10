'use client';

import ListArticlesAdmin from '@/components/articles/admin/ListArticlesAdmin';
import ListArcticlesUser from '@/components/articles/ListArcticlesUser';
import useUser from '@/hooks/user/useUser';

const page = () => {
  const { useGetUserProfile } = useUser();
  const { data: currentUser, isLoading } = useGetUserProfile();

  // console.log('current Role : ', currentUser?.role);
  const isAdmin = currentUser?.role === 'Admin';
  // console.log('isAdmin?? : ', isAdmin);

  if (isLoading) return <p>loading...</p>;

  return <div>{isAdmin ? <ListArticlesAdmin /> : <ListArcticlesUser />}</div>;
};

export default page;
