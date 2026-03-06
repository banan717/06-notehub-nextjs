import type { Note } from '../types/note';
import axios from 'axios';

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

export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const { data } = await axios.post(`${API_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
};
