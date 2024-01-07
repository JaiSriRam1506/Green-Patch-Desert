import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

import { useThemeMode } from "../context/ThemeModeContext";
export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}
