import '@boot/mapbox';
import query from '@boot/query';
import MarkersRoutes from '@markers/routes';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

export default () => (
    <React.StrictMode>
      <QueryClientProvider client={query}>
          <Routes>
            <Route path="*" element={<MarkersRoutes />} />
          </Routes>
      </QueryClientProvider>
    </React.StrictMode>
)
