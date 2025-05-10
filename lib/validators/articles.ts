import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Please enter title'),
  categoryId: z.string().min(1, 'Please select category'),
  imageUrl: z
    .custom<File>()
    .refine((file) => file instanceof File, 'Plese enter picture')
    .refine((file) => ['image/jpeg', 'image/png'].includes(file?.type), 'Support File type : jpg or png')
    .optional(),
  content: z.string().min(1, 'Content field cannot be empty'),
});

export type FormSchema = z.infer<typeof formSchema>;

// Category
export const formSchemaCategory = z.object({
  name: z.string().min(1, 'Category field cannot be empty'),
});

export type FormSchemaCategory = z.infer<typeof formSchemaCategory>;
