// Quick test to verify admin components load without import errors
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import ProductManagement from '../src/components/admin/ProductManagement';
import OrderManagement from '../src/components/admin/OrderManagement';
import UserManagement from '../src/components/admin/UserManagement';
import AnalyticsDashboard from '../src/components/admin/AnalyticsDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function TestApp() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div style={{ padding: '20px' }}>
            <h1>Admin Components Test</h1>
            
            <div style={{ marginBottom: '20px' }}>
              <h2>Analytics Dashboard</h2>
              <AnalyticsDashboard />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h2>Product Management</h2>
              <ProductManagement />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h2>Order Management</h2>
              <OrderManagement />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h2>User Management</h2>
              <UserManagement />
            </div>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default TestApp;
