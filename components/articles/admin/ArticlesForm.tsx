'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useArticles from '@/hooks/articles/useArticles';
import axiosInstance from '@/lib/api/axios';
import { formSchema, FormSchema } from '@/lib/validators/articles';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '../FormFieldArticles';

const ArticlesForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: '',
      content: '',
      imageUrl: undefined,
      title: '',
    },
  });

  //  Preview
  const [preview, setPreview] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const router = useRouter();

  // Category dari articles
  const { getAllArticlesQuery, createArticlesMutation } = useArticles();
  const { data: allArticles } = getAllArticlesQuery();
  console.log('category', allArticles);

  // upload thumbnail
  const uploadThumbnail = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post('/upload', formData);
    console.log('isi uploadThumbnail', response.data);
    return response.data.imageUrl;
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const onSubmit = async (data: FormSchema) => {
    let thumbnailUrl: string | undefined = undefined;

    if (data.imageUrl) {
      await uploadThumbnail(data.imageUrl);
    }

    await createArticlesMutation.mutateAsync({
      categoryId: data.categoryId,
      content: data.content,
      title: data.title,
      imageUrl: thumbnailUrl,
    });

    router.push('/articles');

    console.log('Submitted:', data);
    console.log(thumbnailUrl);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        {isPreviewing ? (
          <Button className="cursor-pointer" type="button" variant="secondary" onClick={() => setIsPreviewing?.(!isPreviewing)}>
            Back to edit
          </Button>
        ) : null}
      </div>

      {isPreviewing ? (
        <div className="space-y-6 border rounded-md p-6 bg-white h-[50vh]">
          <h1 className="text-2xl font-bold">Title : {form.watch('title')}</h1>
          <p className="text-muted-foreground">Category: {form.watch('categoryId')}</p>
          {preview && <Image src={preview} alt="Thumbnail Preview" width={300} height={300} className="rounded w-full" />}
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: form.watch('content') }} />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full w-full gap-5">
            {/* Thumbnail */}
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="thumbnail">Thumbnail</Label>

              {preview ? (
                <div>
                  <Input id="thumbnail" type="file" accept="image/*" onChange={handleThumbnailChange} className="w-[223px] h-[163px] hidden" />
                  {preview && <Image src={preview} alt="preview" width={200} height={120} className="mt-2 rounded" />}
                </div>
              ) : (
                <div>
                  <Input id="thumbnail" type="file" accept="image/*" onChange={handleThumbnailChange} className="w-[223px] h-[163px]" />
                </div>
              )}

              {/* Change and delete */}
              {preview && (
                <div className="flex justify-start items-center gap-2 pl-12">
                  <Label htmlFor="thumbnail" className="text-blue-500 font-normal text-[12px] underline underline-offset-2 cursor-pointer">
                    Change
                  </Label>
                  <Button
                    type="button"
                    onClick={() => {
                      setPreview?.(null);
                      form.setValue('imageUrl', undefined);

                      // Clear value in input file (reset file input)
                      const fileInput = document.getElementById('thumbnail') as HTMLInputElement;
                      if (fileInput) fileInput.value = '';
                    }}
                    className="font-normal text-[12px] bg-transparent text-red-500 shadow-none hover:bg-transparent underline underline-offset-2"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <FormField name="title" label="Title" placeholder="Input title" control={form.control} />
            </div>

            {/*  Category */}
            <div>
              <FormField name="categoryId" label="Category" control={form.control} type="select" />
            </div>

            {/* text area */}
            <div className="h-[551px] w-full flex flex-col gap-2 rounded-none rounded-b-[12px]">
              <FormField name="content" label="Content" placeholder="Type a content" control={form.control} />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button className="cursor-pointer" onClick={() => router.push('/articles')} type="button" variant="outline">
                Cancel
              </Button>
              {isPreviewing ? null : (
                <Button className="cursor-pointer" type="button" variant="secondary" onClick={() => setIsPreviewing?.(!isPreviewing)}>
                  Preview
                </Button>
              )}
              <Button type="submit">Upload</Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default ArticlesForm;
