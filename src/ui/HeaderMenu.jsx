import styled from "styled-components";
import ButtonIcon from "../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
