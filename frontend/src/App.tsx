import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/admin/profile";
import UserPage from "./pages/admin/user";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProtectedRoutes from "./utils/protectRoutes";
import UnProtectedRoutes from "./utils/unProtectedRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<UserPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<UnProtectedRoutes />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<div>Error</div>} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
