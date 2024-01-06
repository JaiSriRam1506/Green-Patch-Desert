import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlineLogout } from "react-icons/hi";
import useLogout from "./useLogout";

export default function Logout() {
  const { logOut, isLoggingOut } = useLogout();
  return (
    <ButtonIcon
      onClick={() => {
        logOut();
      }}
      disabled={isLoggingOut}
    >
      <HiOutlineLogout />
    </ButtonIcon>
  );
}
