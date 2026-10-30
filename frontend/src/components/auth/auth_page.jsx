import { useState } from "react";
import { useAuth } from "../../context/auth_context.jsx";
import styles from "./auth_page.module.css";

const AuthPage = () => {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isSignup = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      if (isSignup) await signup(name.trim(), email.trim(), password);
      else await login(email.trim(), password);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode(isSignup ? "login" : "signup");
    setError("");
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{isSignup ? "Create account" : "Log in"}</h2>

        {isSignup && (
          <>
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)}
                   autoComplete="name" maxLength={50} required />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
               autoComplete="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password}
               onChange={(e) => setPassword(e.target.value)}
               autoComplete={isSignup ? "new-password" : "current-password"} required />

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button type="submit" disabled={busy}>
          {busy ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
        </button>

        <button type="button" className={styles.link} onClick={switchMode}>
          {isSignup ? "Have account? Log in" : "No account? Sign up"}
        </button>
      </form>
    </div>
  );
};
export default AuthPage;