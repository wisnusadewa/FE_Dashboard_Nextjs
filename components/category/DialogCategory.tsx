'use client';

import useCategories from '@/hooks/categories/useCategories';
import { formSchemaCategory, FormSchemaCategory } from '@/lib/validators/articles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormFieldArticles from '../articles/FormFieldArticles';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form } from '../ui/form';

interface DialogCategoryProps {
  titleTriger: string;
  titleTrigerClassName?: string;
  titleHeader: string;
  textButton: string;
  classNameButton?: string;
  type: CategoryFormInputType;
  categoryId?: string;
}

const DialogCategory = ({ textButton, titleTriger, titleTrigerClassName, titleHeader, classNameButton, type, categoryId }: DialogCategoryProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchemaCategory>({
    resolver: zodResolver(formSchemaCategory),
    defaultValues: {
      name: '',
    },
  });

  const { addCategoriesQuery, editCategoriesQuery, deleteCategoriesQuery } = useCategories();

  const onSubmit = (values: FormSchemaCategory) => {
    // handle add category
    if (type === 'Add') {
      // console.log('add triger', values);
      addCategoriesQuery.mutate(values);
      setOpen(false);
    } else if (type === 'Edit') {
      // console.log('data edit?:', values);
      editCategoriesQuery.mutate({
        id: categoryId,
        name: values.name,
      });
      setOpen(false);
      console.log('categoryId', categoryId);
    }
  };

  const handleDeleteCategory = () => {
    deleteCategoriesQuery.mutate(categoryId!);
    setOpen(false);
    // console.log('categoryId??', categoryId);
  };

  const isAddCategory = type === 'Add';
  const isEditCategory = type === 'Edit';
  const isDeleteCategory = type === 'Delete';
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="px-0 py-1.5 w-full bg-transparent hover:bg-transparent text-white flex justifButtony-start items-center rounded-none md:text-[14px] text-[12px] font-medium cursor-pointer">
          <span className={titleTrigerClassName}>{titleTriger}</span>
        </DialogTrigger>
        <DialogContent className=" w-[400px]">
          <DialogHeader className="space-y-6">
            <DialogTitle>{titleHeader}</DialogTitle>
            {isDeleteCategory && <DialogDescription>Deleting this category is permanent and cannot be undone. All related articles will be removed.</DialogDescription>}

            {isDeleteCategory ? (
              <div className="w-full flex justify-end gap-2">
                <Button className="bg-white text-black border hover:bg-gray-100/80" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDeleteCategory} type="submit" className={classNameButton}>
                  {textButton}
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* khusus add form */}
                  {isAddCategory && <FormFieldArticles control={form.control} label="Category" name="name" placeholder="Input category" />}

                  {isEditCategory && <FormFieldArticles control={form.control} label="Category" name="name" placeholder="Input category" />}

                  <div className="w-full flex justify-end gap-2">
                    <Button className="bg-white text-black border hover:bg-gray-100/80" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className={classNameButton}>
                      {textButton}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogCategory;
