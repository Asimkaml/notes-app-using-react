import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ToastProvider } from "./context/toast_context.jsx";
import { AuthProvider, useAuth } from "./context/auth_context.jsx";
import AuthPage from "./components/auth/auth_page.jsx";

// avoid dark flash on login page for light-theme users
document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

function Root() {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? <App /> : <AuthPage />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </ToastProvider>
  </StrictMode>
);
