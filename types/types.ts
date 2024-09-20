// lib/types.ts
export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  role: 'user' | 'admin';
}