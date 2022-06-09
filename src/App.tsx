import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthGoogleProvider } from "./contexts/authGoogle";
import AppRoutes from "./routes/auth.routes";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGoogleProvider>
        <AppRoutes />
      </AuthGoogleProvider>
    </QueryClientProvider>
  );
};

export default App;
