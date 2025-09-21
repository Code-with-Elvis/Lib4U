import Cookies from "js-cookie";
import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,
  loading: true,
  login: (user) => set({ user, loading: false }),
  logout: () => set({ user: null, loading: false }),
  setLoading: (loading) => set({ loading }),
}));

const getInitialTheme = () => {
  // Check for stored theme
  const storedTheme = Cookies.get("b_theme");

  if (storedTheme) {
    return storedTheme;
  }

  // Fallback to system preference
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return prefersDarkMode ? "dark" : "light";
};

const useTheme = create((set) => ({
  theme: getInitialTheme(),
  toggleTheme: (theme) => {
    Cookies.set("b_theme", theme, { expires: 365 });
    set({ theme });
  },
}));

const useAccountModal = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export { useAuth, useTheme, useAccountModal };
