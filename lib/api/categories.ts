import { toast } from 'sonner';
import axiosInstance from './axios';

export const getAllCategories = async ({ limit = 10, page = 1, search = '' }: CategoryParams = {}): Promise<CategoriesResponse> => {
  try {
    const response = await axiosInstance.get<CategoriesResponse>('/categories');
    return response.data;
  } catch (err) {
    console.log('err : ', err);
    throw err;
  }
};

export const addCategories = async (data: FormSchemaCategoryParams): Promise<Categories> => {
  try {
    const response = await axiosInstance.post('/categories', data);
    console.log('data post categories : ', response.data);

    return response.data;
  } catch (err) {
    console.log('err : ', err);
    throw err;
  }
};
export const editCategories = async (data: FormSchemaCategoryParams): Promise<Categories> => {
  try {
    const response = await axiosInstance.put(`/categories/${data.id}`, data);
    return response.data;
  } catch (err) {
    console.log('err : ', err);
    throw err;
  }
};

export const deleteCategories = async (id: string): Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (err) {
    console.log('err : ', err);
    throw err;
  }
};
