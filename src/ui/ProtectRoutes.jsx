import { useEffect, useState } from "react";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
/* Create a Styled to capture full Window */
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  background-color: var(--color-grey-50);
  align-items: center;
  justify-items: center;
`;
export default function ProtectRoutes({ children }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let { isLoading, user, isAuthenticated } = useUser();

  /* Check if User is not authenticated then go to login page */
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  window.addEventListener("storage", () => {
    queryClient.removeQueries();
  });
  /* Check if Api is working while retrieving User data then show Loading */
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated && !isLoading) return children;
}
