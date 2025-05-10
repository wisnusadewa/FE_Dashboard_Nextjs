'use client';

import { RootState } from '@/app/store';
import { useMediaQuery } from '@react-hook/media-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Badge } from '../ui/badge';

const CardArticles = ({ data, limit, page, total }: ArticlesResponse) => {
  const selectedCategory = useSelector((state: RootState) => state.filter); // ambil value filter dari redux
  const isMd = useMediaQuery('(min-width : 768px)'); // buat media md
  const limitDispay = !isMd ? 3 : limit; // limit display jika tidak sama dengan md (khusus sm)

  const articlesDisplay = data.slice(0, limitDispay); // tampilkan 3 data jika ukuran sm, jika tidak maka limit
  //   console.log('articlesDisplay', articlesDisplay);

  // tampilkan jika ada category jika tidak maka semua artikel ( function filter )
  const filteredArticles = selectedCategory.value ? articlesDisplay.filter((item) => item.category.id === selectedCategory.value) : articlesDisplay;

  // console.log('selectedCategory', selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px]">
      {filteredArticles.map((e) => (
        //   dalam card
        <div key={e.id} className="flex flex-col mx-auto w-[280px] lg:w-[387px] h-[368px] md:h-[432px]">
          <Link href={`/articles/${e.id}`} className="flex flex-col gap-2">
            {e?.imageUrl ? (
              <Image src={e?.imageUrl} alt="image-articles" width={240} height={386} className="object-cover w-full h-[200px] rounded-[12px]" />
            ) : (
              <p className="h-[200px] border border-slate-200 rounded-[12px] text-center">gambar tidak tersedia</p>
            )}
            <p className="text-[12px] text-xs text-slate-600">{dayjs(e.createdAt).format('MMM D, YYYY')}</p>
            <p className="text-[18px] font-semibold text-slate-900">{e.title}</p>
            <p className="text-[16px] font-normal text-slate-600">{e.content.slice(0, 100)}...</p>
            <Badge variant={'default'} className="text-blue-900 font-normal">
              {e.category.name}
            </Badge>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardArticles;
