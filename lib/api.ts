import axios from 'axios';
import { Note } from '../types/note';

const API_URL = 'https://your-api.com';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await axios.get(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};
