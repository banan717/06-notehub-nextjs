import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const initialData = await fetchNotes(); // отримуємо нотатки з API

  return <NotesClient initialData={initialData} />; // передаємо як initialData
}
