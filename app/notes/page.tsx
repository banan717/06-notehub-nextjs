import { fetchNotes, type FetchNotesResponse, type FetchNotesParams } from "@/lib/api";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // prefetch notes для SSR
  await queryClient.prefetchQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  return (
    <NotesClient dehydratedState={dehydrate(queryClient)} />
  );
}