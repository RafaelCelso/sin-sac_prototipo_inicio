"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const [showCard, setShowCard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="login-page">
      {/* Splash */}
      <div className={`splash ${showCard ? "hide" : ""}`}>
        <img src="/logo.png" alt="SINCORE Logo" className="splash-logo" />
      </div>

      {/* Login Card */}
      <div className={`login-card ${showCard ? "show" : ""}`}>
        <div className="card-header">
          <img src="/logo.png" alt="SINCORE Logo" className="logo" width={80} height={80} />
          <h1>SINCORE</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3.333 3.333h13.334c.916 0 1.666.75 1.666 1.667v10c0 .917-.75 1.667-1.666 1.667H3.333c-.916 0-1.666-.75-1.666-1.667V5c0-.917.75-1.667 1.666-1.667z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.333 5L10 11.667 1.667 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3.333" y="9.167" width="13.333" height="9.167" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.833 9.167V5.833a4.167 4.167 0 018.334 0v3.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-wrapper">
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>
            <a href="#" className="forgot-link">Esqueceu a senha?</a>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>

      <div className={`page-footer ${showCard ? "show" : ""}`}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <rect x="3.333" y="9.167" width="13.333" height="9.167" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.833 9.167V5.833a4.167 4.167 0 018.334 0v3.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Conexão segura e criptografada</span>
      </div>
    </div>
  );
}
