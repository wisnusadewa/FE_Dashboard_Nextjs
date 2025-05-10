import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface OptionRoleProps {
  value: string;
  label: string;
}

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string; // label
  placeholder?: string; // placeholder input
  type?: 'text' | 'password' | 'select'; // type input
  optionsRole?: OptionRoleProps[]; // select role
}

const FormField = <T extends FieldValues>({ control, name, type = 'text', label, placeholder, optionsRole }: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col justify-center">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'select' && optionsRole ? (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder || 'Select Role'} />
                </SelectTrigger>
                <SelectContent>
                  {optionsRole.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input type={type} placeholder={placeholder} {...field} className="w-full" />
            )}
          </FormControl>
          <FormMessage className="text-[14px]">{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormField;
