import useArticles from '@/hooks/articles/useArticles';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface Option {
  label: string;
  value: string;
}

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file ' | 'select' | 'textarea';
  options?: Option[]; // untuk select
  classNameInput?: string;
}

const FormFieldArticles = <T extends FieldValues>({ name, type = 'text', label, placeholder, control, options, classNameInput }: FormFieldProps<T>) => {
  const { getAllArticlesQuery } = useArticles();
  const { data: articles } = getAllArticlesQuery();

  const categoryArticles = Array.from(new Map((articles?.data ?? []).map((article) => [article.category.id, article.category])).values());

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'select' ? (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="glass w-36">
                  <SelectValue placeholder={placeholder || 'Select Category'} />
                </SelectTrigger>
                <SelectContent className="glass">
                  {categoryArticles.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div>{type === 'textarea' ? <Textarea className={classNameInput} {...field} /> : <Input type={type} placeholder={placeholder} {...field} className={classNameInput} />}</div>
            )}
          </FormControl>
          <FormDescription />
          <FormMessage>{fieldState.error?.message}</FormMessage>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

export default FormFieldArticles;
