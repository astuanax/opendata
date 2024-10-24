// src/index.js or src/App.js
import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createRouter, RouterProvider} from '@tanstack/react-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// Import the generated route tree
import {routeTree} from './routeTree.gen'

export const queryClient = new QueryClient();


// Create a new router instance
const router = createRouter({routeTree, trailingSlash: "preserve"})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode><QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
    </QueryClientProvider></StrictMode>,
)
