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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const queryParams: FetchNotesParams = { page, perPage: 12, search };

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(queryParams),
    initialData,
  });

  return (
    <div>
      <SearchBox onSearch={setSearch} />
      <button onClick={() => setModalOpen(true)}>Create Note</button>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onClose={() => setModalOpen(false)} />
        </Modal>
      )}
      {data && <NoteList notes={data.notes} />}
      {data && data.totalPages > 1 && (
        <Pagination totalPages={data.totalPages} page={page} onPageChange={setPage} />
      )}
    </div>
  );
}