import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const response = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const { isLoading, data: settings, error } = response;
  // console.log(response);
  return { settings, isLoading, error };
}
