import { create } from 'zustand';

interface State {
  currentSection: string;
  scrollProgress: number;
  isLoading: boolean;
  setSection: (section: string) => void;
  setScrollProgress: (progress: number) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<State>((set) => ({
  currentSection: 'hero',
  scrollProgress: 0,
  isLoading: true,
  setSection: (section) => set({ currentSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
