import { addCategories, deleteCategories, editCategories, getAllCategories } from '@/lib/api/categories';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useCategories = () => {
  const queryClient = useQueryClient();

  const getAllCategoriesQuery = ({ limit, page, search }: CategoryParams = {}) => {
    return useQuery<CategoriesResponse>({
      queryKey: ['categories', limit, page, search],
      queryFn: () => getAllCategories({ limit, page, search }),
      placeholderData: keepPreviousData,
      retry: false,
    });
  };

  const addCategoriesQuery = useMutation({
    mutationKey: ['categories'],
    mutationFn: addCategories,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast.success('categories success created!');
      }
    },
  });
  const editCategoriesQuery = useMutation({
    mutationKey: ['categories'],
    mutationFn: editCategories,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories', variables.id] });
      toast.success('categories success edited!');
    },
  });
  const deleteCategoriesQuery = useMutation({
    mutationKey: ['categories'],
    mutationFn: deleteCategories,
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['categories', id] });
      // toast.success('categories success deleted!');
    },
  });

  return { getAllCategoriesQuery, addCategoriesQuery, editCategoriesQuery, deleteCategoriesQuery };
};

export default useCategories;
