import { fetchNoteById } from "../../../lib/api";
import { NoteDetailsClient } from "./NoteDetails.client";
import { QueryClient } from "@tanstack/react-query";

interface NoteDetailsPageProps {
  params: { id: string };
}

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["note", params.id], () =>
    fetchNoteById(params.id)
  );

  return <NoteDetailsClient />;
};

export default NoteDetailsPage;