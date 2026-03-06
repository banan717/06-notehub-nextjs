// components/NoteForm/NoteForm.tsx
import React from "react";
import type { Note } from "../../types/note";
import { createNote } from "../../lib/api";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void; // <- тут описуємо пропс
}

const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
  const handleSubmit = async (note: Note) => {
    await createNote(note);
    onClose(); // викликаємо закриття модалки після створення
  };

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        const note: Note = {
          id: "", // або згенеруй id
          title: (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value,
          content: (e.currentTarget.elements.namedItem("content") as HTMLInputElement).value,
          tag: "",
          createdAt: new Date().toISOString(),
        };
        handleSubmit(note);
      }}
    >
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default NoteForm;
