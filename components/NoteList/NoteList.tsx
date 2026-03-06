// components/NoteList/NoteList.tsx
'use client';

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.tag}</p>
          <p>{note.content}</p>
          <button onClick={() => deleteMutation.mutate(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
