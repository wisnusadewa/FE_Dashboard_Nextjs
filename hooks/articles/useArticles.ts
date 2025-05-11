import { createArticles, deleteArticles, editArticles, getAllArticles, getArticlesById } from '@/lib/api/articles';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useArticles = () => {
  const queryClient = useQueryClient();

  const getAllArticlesQuery = ({ limit, page, title, categoryId }: ArticlesParams = {}) => {
    return useQuery<ArticlesResponse>({
      // queryKey: ['articles', params ?? {}], // ini agar bisa fetch tanpa params
      queryKey: ['articles', limit, page, title, categoryId], // ini agar bisa fetch tanpa params
      queryFn: () => getAllArticles({ limit, page, title, categoryId }),
      placeholderData: keepPreviousData,
      retry: false,
    });
  };

  const getArticlesByIdQuery = (id: string) => {
    return useQuery<Articles>({
      queryKey: ['articles', id],
      queryFn: () => getArticlesById(id),
      enabled: !!id, // fetch ketika ada id
    });
  };

  const createArticlesMutation = useMutation({
    mutationKey: ['articles'],
    mutationFn: createArticles,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        toast.success('articles success created!');
      }
    },
  });

  const editArticlesMutation = useMutation({
    mutationKey: ['articles'],
    mutationFn: (data: ArticlesCreateParams) => editArticles(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['articles', variables.id] });
      toast.success('articles success edited!');
    },
  });

  const deleteArticlesMutation = useMutation({
    mutationKey: ['articles'],
    mutationFn: deleteArticles,
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['articles', id] });
      toast.success('deleting success!');
    },
  });

  return { getAllArticlesQuery, getArticlesByIdQuery, createArticlesMutation, editArticlesMutation, deleteArticlesMutation };
};

export default useArticles;
