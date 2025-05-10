import { toast } from 'sonner';
import axiosInstance from './axios';

export const getAllArticles = async ({ title = '', page = 1, limit = 10, categoryId }: ArticlesParams = {}): Promise<ArticlesResponse> => {
  try {
    const response = await axiosInstance.get<ArticlesResponse>(`/articles?page=${page}&limit=${limit}&title=${title}&categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getArticlesById = async (id: string): Promise<Articles> => {
  try {
    const response = await axiosInstance.get<Articles>(`/articles/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createArticles = async (data: ArticlesCreateParams): Promise<Articles> => {
  try {
    const response = await axiosInstance.post('/articles', data);
    console.log('data post articles : ', response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const editArticles = async (data: ArticlesCreateParams): Promise<Articles> => {
  console.log('data dikirimkan dari frontend', data);

  try {
    const response = await axiosInstance.put(`/articles/${data.id}`, data);
    console.log('data edit articles : ', response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Delete
export const deleteArticles = async (id: string): Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/articles/${id}`);
    console.log('data delete articles : ', response.data);
    toast.success(response.data.message);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
