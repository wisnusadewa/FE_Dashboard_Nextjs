'use client';

import useArticles from '@/hooks/articles/useArticles';
import useDebounce from '@/hooks/debounce/useDebounce';
import useUser from '@/hooks/user/useUser';
import { useState } from 'react';
import Footer from '../footer/Footer';
import CardArticles from './CardArticles';
import HeaderListArticles from './HeaderListArticles';
import PaginationComp from './PaginationComp';

const ListArcticlesUser = () => {
  // Untuk mencari role user
  const { useGetUserProfile } = useUser();
  const { data: user } = useGetUserProfile();
  const limitByRole = user?.role === 'Admin' ? 10 : 9; // limit by role

  // Search
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = limitByRole;
  const debounceSearch = useDebounce(search, 500); // debounce untuk search

  // Query
  const { getAllArticlesQuery } = useArticles();

  const { data: allArticle, isLoading } = getAllArticlesQuery({
    title: debounceSearch,
    page,
    limit,
  });

  const total = Number(allArticle?.total); // total item render
  const hasArticles = allArticle?.data.length;

  if (isLoading) return <p>loading data...</p>;

  return (
    <div>
      {/* Header */}
      <div>
        <HeaderListArticles allArticle={allArticle?.data ?? []} search={search} setSearch={setSearch} />
      </div>

      {/* Card Data */}
      <div className="px-[20px] md:px-[100px] w-full flex flex-col justify-center items-center pb-[100px] pt-[40px]">
        <p className="hidden lg:block font-medium text-[16px] text-slate-600 justify-center items-center text-start w-full mb-[24px] ]">
          Showing : {hasArticles} of {total} articles
        </p>
        <div className="w-full h-full">{hasArticles ? <CardArticles data={allArticle.data} limit={allArticle.limit} page={allArticle.page} total={allArticle.total} /> : <p>no articles</p>}</div>
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center items-center">{user?.role && <PaginationComp currentPage={page} setPage={setPage} limit={limit} role={user?.role as RolePagination} totalItem={total} />}</div>

      <div className="w-full flex justify-center items-center mt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default ListArcticlesUser;
