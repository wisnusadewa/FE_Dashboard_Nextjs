'use client';

import useArticles from '@/hooks/articles/useArticles';
import dayjs from 'dayjs';
import Image from 'next/image';
import OtherCard from './OtherCard';

interface PreviewArticleIdProps {
  article: Articles;
}

const PreviewArticleId = ({ article }: PreviewArticleIdProps) => {
  const categoryArticleByName = article?.category?.name;
  //   console.log('categoryArticleId', categoryArticleByName);

  //   console.log('article by id', article);

  const { getAllArticlesQuery } = useArticles();
  const { data: allArticles } = getAllArticlesQuery();
  //   console.log('allArticles', allArticles);

  return (
    <div className="w-full h-full flex flex-col px-[20px] lg:px-[160px] justify-center items-center mt-[40px]">
      {/* All Content */}
      <div className="flex flex-col justify-center items-center">
        {/* header content */}
        <div className="h-[132px] w-[335px] flex flex-col  text-center justify-between items-center">
          <div className="flex gap-2 text-sm text-slate-600 text-[16px]">
            <p>{dayjs(article?.createdAt).format('MMM D, YYYY')}</p>
            <ul>
              <li className="list-disc list-inside list">Created by {article?.user.username}</li>
            </ul>
          </div>
          <div>
            <p className="text-slate-900 text-[24px] font-semibold">{article?.title}</p>
          </div>
        </div>

        {/* content article */}
        <div className="flex flex-col justify-center items-center">
          {/* image */}
          <div className="w-[335px] md:w-[1120px] h-[250px] md:h-[480px] flex py-[24px]">
            {article?.imageUrl ? (
              <Image src={article?.imageUrl} width={500} height={500} alt="image-article" className="w-full object-cover rounded-[12px]" />
            ) : (
              <div className="w-full rounded-[12px] text-center border">
                <p>gambar tidak tersedia</p>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center text-center w-full pb-[40px]">
            <p className="text-[14px] font-normal">{article?.content}</p>
          </div>
        </div>
      </div>

      {/* others  */}
      <div className="pt-[40px] w-full ">
        <div className="w-full">
          <h2 className="font-bold text-[18px] text-slate-900">Other articles</h2>
        </div>

        {/* --- */}
        <OtherCard allArticles={allArticles?.data ?? []} categoryArticleByName={categoryArticleByName} />
      </div>
    </div>
  );
};

export default PreviewArticleId;
