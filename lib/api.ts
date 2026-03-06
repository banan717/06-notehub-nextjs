// lib/api.ts
import axios from "axios";
import type { Note } from "../types/note";

// URL твоєї API
const API_URL = "https://api.example.com/notes"; // заміни на свій URL
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// Параметри для fetchNotes
export type FetchNotesParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

// Відповідь від fetchNotes
export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

// Отримати список нотаток з API
export const fetchNotes = async (
  params?: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params: params,
  });

  // Якщо API повертає просто масив нотаток, робимо просту пагінацію
  const notes: Note[] = data;
  const perPage = params?.perPage || 12;
  const page = params?.page || 1;

  const totalPages = Math.ceil(notes.length / perPage);
  const paginatedNotes = notes.slice((page - 1) * perPage, page * perPage);

  return {
    notes: paginatedNotes,
    totalPages,
  };
};

// Створити нотатку
export const createNote = async (note: Note): Promise<Note> => {
  const { data } = await axios.post(API_URL, note, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};

// Видалити нотатку
export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
};

// Отримати деталі однієї нотатки
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};
