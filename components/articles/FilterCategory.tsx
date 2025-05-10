import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import { AppDispatch } from '@/app/store';
import { setValueFilter } from '@/app/store/slice/filterValueSlice';
import { useDispatch } from 'react-redux';

const FilterCategory = ({ allArticle }: { allArticle: Articles[] }) => {
  const dispatch = useDispatch<AppDispatch>();

  const categoryArticles = Array.from(new Map((allArticle ?? []).map((article) => [article.category.id, article.category])).values());

  // handleChange + redux
  const handleChange = (e: string) => {
    // console.log('e????:', e);
    dispatch(setValueFilter({ value: e }));
  };

  // console.log('categoryArticles:', categoryArticles);
  // console.log('selectedCategory', selectedCategory);
  // console.log('allArticle dari filter', allArticle);

  return (
    <div className="w-full md:w-[180px] h-[40px]  rounded-[12px] text-black">
      {/*  */}
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full bg-white ">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categoryArticles?.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterCategory;
