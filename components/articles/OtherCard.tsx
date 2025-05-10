import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';

interface OtherCardProps {
  allArticles: Articles[];
  categoryArticleByName: string;
}

const OtherCard = ({ allArticles, categoryArticleByName }: OtherCardProps) => {
  console.log('allArticles other card : ', allArticles);
  console.log('categoryArticleByName other card : ', categoryArticleByName);

  const showArticleByCategory = categoryArticleByName ? allArticles.filter((article) => article.category.name === categoryArticleByName) : null;

  console.log('showArticleByCategory', showArticleByCategory);

  if (showArticleByCategory?.length === 0) return <p>tidak ada kategori serupa.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px] pt-[24px] pb-[160px]">
      {/* mapping */}
      {showArticleByCategory?.slice(0, 3).map((article) => (
        <div className="flex flex-col mx-auto w-[335px] lg:w-[387px] h-[368px] md:h-[432px] cursor-pointer ">
          <Link href={`/articles/${article?.id}`} className="flex flex-col gap-2">
            {article?.imageUrl ? (
              <div className="w-[335px] h-[250px]">
                <Image src={article?.imageUrl} alt="image-articles" width={240} height={386} className="object-cover w-full h-[200px] rounded-[12px]" />
              </div>
            ) : (
              <div className="rounded-[12px] w-[335px] h-[250px] text-center border">
                <p>gambar tidak tersedia</p>
              </div>
            )}
            <p className="text-[12px] text-xs text-slate-600">{dayjs(article?.createdAt).format('MMM D, YYYY')}</p>
            <p className="text-[16px] font-semibold text-slate-900">{article?.title}</p>
            <p className="text-[16px] font-normal text-slate-600">{article?.content.slice(0, 100)}...</p>
            <Badge variant={'default'} className="text-blue-900 font-normal">
              {article?.category.name}
            </Badge>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OtherCard;
