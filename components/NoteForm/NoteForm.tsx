'use client';

import React from 'react';
import { useFormik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote} from '../../lib/api';
import type { Note } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

export const NoteForm: React.FC = () => {
  const queryClient = useQueryClient();

  // Використовуємо TanStack Mutation для створення нотатки
  const mutation = useMutation({
    mutationFn: (note: Note) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  // Formik для керування формою
  const formik = useFormik<NoteFormValues>({
    initialValues: { title: '', content: '', tag: '' },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      tag: Yup.string(),
    }),
    onSubmit: (values: NoteFormValues, { resetForm }: FormikHelpers<NoteFormValues>) => {
      // Ось сюди вставляємо handleCreate
      const note: Note = {
        id: '', // сервер зазвичай генерує id
        ...values,
        createdAt: new Date().toISOString(),
      };
      mutation.mutate(note);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formik.values.content}
        onChange={formik.handleChange}
      />
      <input
        type="text"
        name="tag"
        placeholder="Tag"
        value={formik.values.tag}
        onChange={formik.handleChange}
      />
      <button type="submit">Create Note</button>
    </form>
  );
};

export default NoteForm;
