'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30* 60 * 1000, // 30 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: 'online',
    },
    mutations: {
      retry: 0,
      networkMode: 'online',
    },
  },
});

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );  
};

export default ReactQueryProvider;