'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useArticles from '@/hooks/articles/useArticles';
import axiosInstance from '@/lib/api/axios';
import { formSchema, FormSchema } from '@/lib/validators/articles';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormFieldArticles from '../FormFieldArticles';

const EditForm = () => {
  //  Preview
  const [preview, setPreview] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: '',
      content: '',
      imageUrl: undefined,
      title: '',
    },
  });

  // console.log('id articles??', id);

  // Category dari articles
  const { getArticlesByIdQuery, editArticlesMutation } = useArticles();
  const { data: articlesDataId } = getArticlesByIdQuery(String(id));

  // upload thumbnail
  const uploadThumbnail = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axiosInstance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Cek isi formData
      // for (const [key, value] of formData.entries()) {
      //   console.log('form data field:', key, value);
      // }

      console.log('isi uploadImageUrl', response.data.imageUrl);
      return response.data.imageUrl;
    } catch (error: any) {
      console.error('UPLOAD FAILED:', error || error?.message);
      throw error;
    }
  };

  // thumbnail change
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('fileeee?', file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      console.log('objectUrl????', objectUrl);
      form.setValue('imageUrl', file); // Set nilai file ke form
    }
  };

  const onSubmit = async (data: FormSchema) => {
    let thumbnailUrl: string | undefined = undefined;

    console.log('data.imageUrl ????', data.imageUrl);

    if (data.imageUrl instanceof File) {
      thumbnailUrl = await uploadThumbnail(data.imageUrl);
    } else if (typeof data.imageUrl === 'string') {
      //  Gambar lama dari backend
      thumbnailUrl = data.imageUrl;
    }

    console.log('thumbnailUrl ???', thumbnailUrl);

    await editArticlesMutation.mutateAsync({
      id,
      categoryId: data.categoryId,
      content: data.content,
      title: data.title,
      imageUrl: thumbnailUrl,
    });

    // router.push('/articles');
    console.log('Submitted:', data);
  };

  // fetch pertama
  useEffect(() => {
    if (articlesDataId) {
      form.reset({
        categoryId: articlesDataId.category.id,
        title: articlesDataId.title,
        content: articlesDataId.content,
        imageUrl: undefined,
      });
    }
    if (articlesDataId?.imageUrl) {
      setPreview(articlesDataId.imageUrl); // untuk preview image di container image
    }
  }, [articlesDataId]);

  //   console.log('preview', preview);
  return (
    <>
      <div className="h-[64px] flex gap-2 border-b w-full">
        <div onClick={() => router.push('/articles')} className="w-fit flex gap-2 justify-center items-center cursor-pointer">
          <ArrowLeft />
          <p>Edit Articles</p>
        </div>
      </div>
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
          {preview && <Image src={preview} alt="imageUrl Preview" width={300} height={300} className="rounded w-full" />}
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: form.watch('content') }} />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full w-full gap-5">
            {/* Thumbnail */}
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="imageUrl">Thumbnail</Label>

              {preview ? (
                <div>
                  <Input id="imageUrl" type="file" accept="image/*" onChange={handleThumbnailChange} className="w-[223px] h-[163px] hidden" />

                  {preview && (
                    <div className="w-[223px] h-[163px]">
                      <Image src={preview} alt="preview" width={200} height={120} className="mt-2 rounded w-full object-cover" />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Input id="imageUrl" type="file" accept="image/*" onChange={handleThumbnailChange} className="w-[223px] h-[163px]" />
                </div>
              )}

              {/* Change and delete */}
              {preview && (
                <div className="flex justify-start items-center gap-2 pl-12">
                  <Label htmlFor="imageUrl" className="text-blue-500 font-normal text-[12px] underline underline-offset-2 cursor-pointer">
                    Change
                  </Label>
                  <Button
                    type="button"
                    onClick={() => {
                      setPreview?.(null);
                      form.setValue('imageUrl', undefined);

                      // Clear value in input file (reset file input)
                      const fileInput = document.getElementById('imageUrl') as HTMLInputElement;
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
              <FormFieldArticles name="title" label="Title" placeholder="Input title" control={form.control} />
            </div>

            {/*  Category */}
            <div>
              <FormFieldArticles name="categoryId" label="Category" control={form.control} type="select" />
            </div>

            {/* text area */}
            <div className="h-[551px] w-full flex flex-col gap-2 rounded-none rounded-b-[12px]">
              <FormFieldArticles name="content" label="Content" placeholder="Type a content" control={form.control} />
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
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? 'Uploading' : 'Upload'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default EditForm;
