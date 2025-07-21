import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { HelmetProvider } from 'react-helmet-async'

import './index.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import App from './App.jsx'
import { queryClient } from './api/index.js'
import { modernTheme } from './theme/modernTheme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={modernTheme}>
            <Notifications />
            <App />
          </MantineProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
