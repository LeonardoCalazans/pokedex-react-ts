import React from "react";
import { AuthGoogleProvider } from "./contexts/authGoogle";
import AppRoutes from "./routes/auth.routes";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <AuthGoogleProvider>
      <AppRoutes />
    </AuthGoogleProvider>
  );
};

export default App;
