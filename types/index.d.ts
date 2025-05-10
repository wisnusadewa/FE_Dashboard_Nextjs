// ---------------- Auth ----------------

type FormType = 'login' | 'register';
type RolePagination = 'Admin' | 'User';

// untuk hit login
interface LoginParams {
  username: string;
  password: string;
}

// untuk hit register
interface RegisterParams extends LoginParams {
  role?: string;
}

// ---------------- Redux ----------------

interface UserStateReduxProps {
  role: string | null;
  token: string | null;
}

// ---------------- User ----------------
interface User {
  id: string;
  role: string;
  username: string;
}

// ---------------- Articles ----------------

interface Category {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Articles {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  user: User;
}

interface ArticlesParams {
  title?: string;
  page?: number;
  limit?: number;
  categoryId?: string;
}

interface ArticlesResponse {
  data: Articles[];
  total: number;
  page: number;
  limit: number;
}

interface ArticlesCreateParams {
  id?: string;
  categoryId?: string;
  content?: string;
  title?: string;
  imageUrl?: string;
}

type CategoryFormInputType = 'Add' | 'Edit' | 'Delete';

// type LogoutDialogType = 'Logout' | 'Delete';

// ---------------- Category ----------------

interface CategoryParams {
  search?: string;
  page?: number;
  limit?: number;
}

interface Categories {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesResponse {
  data: Categories[];
  totalData: number;
  currentPage: number;
  totalPages: number;
}

interface FormSchemaCategoryParams {
  id?: string;
  name?: string;
}
