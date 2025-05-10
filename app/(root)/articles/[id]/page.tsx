'use client';

import PreviewArticleId from '@/components/articles/PreviewArticleId';
import useArticles from '@/hooks/articles/useArticles';
import { useParams } from 'next/navigation';

const page = () => {
  const { id } = useParams();

  const { getArticlesByIdQuery } = useArticles();
  const { data: Article } = getArticlesByIdQuery(String(id));

  console.log('Article : ', Article);

  return (
    <div>
      <PreviewArticleId article={Article!} />
    </div>
  );
};

export default page;
