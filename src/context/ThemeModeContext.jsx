import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ThemeModeContext = createContext();

export function ThemeModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "App-theme");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  return (
    <ThemeModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (context === undefined) throw new Error("Dark Mode Context used outside");
  return context;
}
