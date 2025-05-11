import { RootState } from '@/app/store';
import DialogDeleteCategory from '@/components/category/DialogDeleteCategory';
import DialogEditCategory from '@/components/category/DialogEditCategory';
import DialogReusable from '@/components/navbar/DialogReusable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useArticles from '@/hooks/articles/useArticles';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';

interface TableAdminProps {
  allArticle: Articles[];
  isCategoryPage?: boolean;
  allCategories: Category[];
}

const TableAdmin = ({ allArticle, isCategoryPage, allCategories }: TableAdminProps) => {
  // console.log('allArticle table:', allArticle);
  const [inputValue, setInputValue] = useState<FormSchemaCategoryParams | undefined>(undefined);

  // Filter
  const selectedCategory = useSelector((state: RootState) => state.filter.value);
  // console.log('selectedCategory', selectedCategory);

  const filteredArticles = selectedCategory ? allArticle.filter((article) => article.category.id === selectedCategory) : allArticle;

  // Delete query tanstack
  const { deleteArticlesMutation } = useArticles();

  const handleDeleteArticle = (id: string) => {
    deleteArticlesMutation.mutate(id);
  };

  return (
    <div>
      <Table>
        <TableHeader className="bg-slate-200 w-full">
          <TableRow className="">
            {/* jika page category */}
            {isCategoryPage ? null : <TableHead className="w-[225px] text-center">Thumbnails</TableHead>}
            {isCategoryPage ? null : <TableHead className="w-[225px] text-center">Title</TableHead>}
            <TableHead className="w-[225px] text-center">Category</TableHead>
            <TableHead className="w-[225px] text-center">Created at</TableHead>
            <TableHead className="w-[225px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-gray-50">
          {/* Jika di halaman kategori, mapping kategori */}
          {isCategoryPage ? (
            allCategories && allCategories.length > 0 ? (
              allCategories.map((category) => (
                <TableRow key={category.id} className="h-[84px] font-normal text-[14px] text-slate-600">
                  <TableCell className="text-center">{category.name}</TableCell>
                  <TableCell className="text-center">{dayjs(category.createdAt).format('MMM D, YYYY HH:mm:ss')}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-3 justify-center items-center px-9">
                      <DialogEditCategory categoryId={category.id} />
                      <DialogDeleteCategory categoryId={category.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            )
          ) : // Else: halaman article
          filteredArticles && filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <TableRow key={article.id} className="h-[84px] font-normal text-[14px] text-slate-600">
                <TableCell className="flex justify-center items-center text-center">
                  {article.imageUrl ? (
                    <div className="w-[60px] h-[84px] text-center flex justify-center items-center">
                      <Image priority src={article?.imageUrl} alt="thumbnail" width={60} height={60} className="object-cover rounded-[6px] w-[60px] h-[60px]" />
                    </div>
                  ) : (
                    <div className="h-[84px] flex justify-center items-center">
                      <p className="text-center">no image</p>
                    </div>
                  )}
                </TableCell>
                <TableCell className="whitespace-normal break-words text-center">{article?.title}</TableCell>
                <TableCell className="text-center">{article?.category.name}</TableCell>
                <TableCell className="text-center">{dayjs(article?.createdAt).format('MMM D, YYYY HH:mm:ss')}</TableCell>
                <TableCell className="text-center">
                  <div className="flex gap-3 justify-center items-center px-9">
                    <p className="text-blue-600 underline underline-offset-2">
                      <Link href={`/articles/${article.id}`}>Preview</Link>
                    </p>
                    <p className="text-blue-600 underline underline-offset-2">
                      <Link href={`/articles/edit/${article.id}`}>Edit</Link>
                    </p>
                    <DialogReusable
                      isDeleteArticles
                      handleDeleteArticle={() => handleDeleteArticle(article.id)}
                      textButton="Delete"
                      titleHeader="Delete Articles"
                      textDialogDescription="Deleting this article is permanent and cannot be undone. All related content will be removed."
                      titleTriger="Delete"
                      titleTrigerClassName="text-red-500 underline underline-offset-2"
                      classNameButton="bg-red-500 hover:bg-red-400"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No articles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableAdmin;
