'use client';

import { RootState } from '@/app/store';
import DialogAddCategory from '@/components/category/DialogAddCategory';
import Navbar from '@/components/navbar/Navbar';
import { Button } from '@/components/ui/button';
import useArticles from '@/hooks/articles/useArticles';
import useCategories from '@/hooks/categories/useCategories';
import useDebounce from '@/hooks/debounce/useDebounce';
import useUser from '@/hooks/user/useUser';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import FilterCategory from '../FilterCategory';
import PaginationComp from '../PaginationComp';
import SearchBar from '../SearchBar';
import TableAdmin from './TableAdmin';

interface ListArticlesAdminProps {
  isCategoryPage?: boolean;
}

const ListArticlesAdmin = ({ isCategoryPage }: ListArticlesAdminProps) => {
  // Untuk mencari role user
  const { useGetUserProfile } = useUser();
  const { data: user } = useGetUserProfile();
  const limitByRole = user?.role === 'Admin' ? 10 : 9; // limit by role

  // Search
  const [search, setSearch] = useState('');
  const selectedCategory = useSelector((state: RootState) => state.filter.value);

  const [page, setPage] = useState(1);
  // const limit = limitByRole;
  const limit = limitByRole;
  const debounceSearch = useDebounce(search, 500); // debounce untuk search
  const router = useRouter();

  // Query
  const { getAllArticlesQuery } = useArticles();
  const { data: allArticle, isLoading } = getAllArticlesQuery({
    title: debounceSearch,
    page,
    limit,
    categoryId: selectedCategory!,
  });

  const { getAllCategoriesQuery } = useCategories();
  const { data: allCategories } = getAllCategoriesQuery({
    limit,
    page,
    search: debounceSearch,
  });

  const total = Number(allArticle?.total); // total item render
  // const hasArticles = allArticle?.data.length;
  const totalArticles = selectedCategory ? allArticle?.data.filter((e) => e.category.id === selectedCategory) : allArticle?.data;

  const handleCreateArticles = () => {
    router.push('/articles/create');
  };

  if (isLoading) return <p>loading data...</p>;

  return (
    <div className="bg-slate-200 min-h-screen">
      {/* Navbar */}
      <div className="border">
        <Navbar />
      </div>

      <div className="px-[24px] py-[24px] h-full">
        <div className="h-[160px] w-full rounded-t-[12px] bg-gray-50  flex flex-col ">
          <div className="flex border w-full h-[72px] justify-start items-center px-[24px]">
            <p className="font-medium text-[16px] text-slate-800">{isCategoryPage ? `Total Category :` : `Total Articles : ${totalArticles?.length}`}</p>
          </div>

          {/* filter category */}
          <div className="flex border w-full h-[88px] justify-between items-center px-[24px]">
            <div className="flex gap-2">
              {isCategoryPage ? null : <FilterCategory allArticle={allArticle?.data ?? []} />}
              <SearchBar value={search} onChange={setSearch} />
            </div>

            <div className="flex justify-center items-center border">
              {isCategoryPage ? (
                <DialogAddCategory />
              ) : (
                <Button onClick={handleCreateArticles} className="w-[135px]">
                  <Plus /> Add Articles
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="h-[1132px] flex flex-col">
          {/* table */}
          <div>
            <TableAdmin allArticle={allArticle?.data ?? []} isCategoryPage={isCategoryPage} allCategories={allCategories?.data ?? []} />
          </div>
          {/* pagination */}
          <div className="flex mb-[100px] h-[88px] justify-center items-center bg-gray-50 border-t border rounded-b-[12px]">
            <PaginationComp currentPage={page} limit={limit} role={user?.role as RolePagination} setPage={setPage} totalItem={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListArticlesAdmin;
