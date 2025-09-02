import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="taskmaster-app">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;