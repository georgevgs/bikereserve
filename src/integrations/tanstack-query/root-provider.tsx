import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const getContext = () => {
  const queryClient = new QueryClient();
  return {
    queryClient,
  };
};

interface ProviderProps {
  children: React.ReactNode;
  queryClient: QueryClient;
}

export const Provider = ({ children, queryClient }: ProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
