import { useContext } from "react";

import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../contexts/Auth";
import api from "../services/api";

const useFetch = (path: string, params = {}, options = {}) => {
  const toast = useToast();
  const { signOut } = useContext(AuthContext);

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      [path, params],
      async () => {
        const response = await api.get(path, {
          params
        });

        return response.data;
      },
      {
        staleTime: 60 * 1000,
        onError: (err: any) => {
          if (err.response?.status === 401) {
            toast({
              title: "Atenção!",
              description: "Entre novamente.",
              status: "warning",
              duration: 3000,
              isClosable: true
            });

            signOut();
          }
        },
        ...options
      }
    );

  return {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData
  };
};

export default useFetch;
