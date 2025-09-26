import { create } from "zustand";
import axios from "axios";

const API_URL = "https://supercultivated-neumic-rose.ngrok-free.dev";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "doctor" | "reception";
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });

      localStorage.setItem("token", res.data.accessToken);

      set({ token: res.data.accessToken });
      await get().fetchMe();
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Login failed" });
    } finally {
      set({ loading: false });
    }
  },

  fetchMe: async () => {
    try {
      const token = get().token;
      if (!token) return;
      const res = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: res.data });
    } catch (err) {
      set({ user: null, token: null });
      localStorage.removeItem("token");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
