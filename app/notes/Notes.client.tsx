"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesParams, type FetchNotesResponse } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteForm from "../../components/NoteForm/NoteForm";
import Modal from "../../components/Modal/Modal";

interface NotesClientProps {
  initialData: FetchNotesResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Параметри для API (зараз вони опціональні)
  const perPage = 12;
  const queryParams: FetchNotesParams = { page, perPage, search };

// …
const { data = initialData } = useQuery<FetchNotesResponse>({
  queryKey: ["notes", page, search],
  queryFn: () => fetchNotes(queryParams),
  initialData,
});

// Використовуємо масив notes
const filteredNotes = data.notes.filter(note =>
  note.title.toLowerCase().includes(search.toLowerCase())
);

const paginatedNotes = filteredNotes.slice((page - 1) * perPage, page * perPage);
const totalPages = Math.ceil(filteredNotes.length / perPage);


  return (
    <div>
      <SearchBox onSearch={setSearch} />
      <button onClick={() => setModalOpen(true)}>Create Note</button>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onClose={() => setModalOpen(false)} />
        </Modal>
      )}

      <NoteList notes={paginatedNotes} />

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} page={page} onPageChange={setPage} />
      )}
    </div>
  );
}
