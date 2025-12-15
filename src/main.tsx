import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "./index.css";


// Create a QueryClient instance (global cache)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // avoids refetch spam when switching tabs
      retry: 1, // retry failed queries once
      staleTime: 1000 * 60, // 1 min - adjust based on API freshness
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          {/* Optional devtools for debugging */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
