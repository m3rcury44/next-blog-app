"use client"

import React, { useState } from 'react';
import {ThemeProvider as NextThemeProvider} from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = ({children}: {children: React.ReactNode}) => {

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Number.POSITIVE_INFINITY
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
