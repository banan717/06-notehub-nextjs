import { QueryClient, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '../../../lib/api';

interface NoteDetailsPageProps {
  params: { id: string };
}

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const queryClient = new QueryClient();

  // SSR prefetch (v5 синтаксис)
  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      {/* Тут гідратована стан може бути передана через TanStackProvider, якщо потрібно */}
      <NoteDetailsClient />
    </div>
  );
};

export default NoteDetailsPage;
