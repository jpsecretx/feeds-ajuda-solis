// ============================================================
// COMPONENTE DE LAYOUT
// ============================================================

import { useState, useEffect } from "react";
import Link from "next/link";
import faqData from "../data/faq.json";

const { config } = faqData;

const whatsappLink = `https://wa.me/${config.whatsappNumero}?text=${encodeURIComponent(
  config.whatsappMensagem
)}`;

export default function Layout({ children }) {
  const [aberto, setAberto] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem("tema");
    if (salvo === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (salvo === "light") {
      setDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  function toggleDarkMode() {
    const novoModo = !darkMode;
    setDarkMode(novoModo);
    const tema = novoModo ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("tema", tema);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER ── */}
      <header style={{
        background: "var(--header-bg)",
        padding: "12px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "background 0.2s",
      }}>

        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/logo.png" alt="Solis" style={{ height: "36px" }} />
          <span style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            color: "#fff",
          }}>
            · Central de Ajuda do Solis
          </span>
        </Link>

        {/* Botão dark/light — canto direito */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
          style={{
            position: "absolute",
            right: "16px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >
          <img
            src={darkMode ? "/claro.png" : "/escuro.png"}
            alt={darkMode ? "Modo claro" : "Modo escuro"}
            style={{ width: "20px", height: "20px" }}
          />
        </button>

      </header>

      {/* ── CONTEÚDO DA PÁGINA ── */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* ── RODAPÉ ── */}
      <footer style={{
        background: "var(--footer-bg)",
        color: "#fff",
        textAlign: "center",
        padding: "10px",
        fontSize: "14px",
        lineHeight: 1.6,
        fontStyle: "bold",
      }}>
        Central de Ajuda do Solis<br />Fundação Solidaridad Brasil · 2026
      </footer>

      {/* ── BOTÃO FLUTUANTE COLAPSÁVEL DO WHATSAPP ── */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "8px",
      }}>

        {aberto && (
          <div style={{
            background: "var(--branco)",
            border: "1px solid var(--borda)",
            borderRadius: "12px",
            padding: "14px 16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            maxWidth: "220px",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}>
              <p style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                color: "var(--escuro)",
              }}>
                Precisa de ajuda?
              </p>
              <button
                onClick={() => setAberto(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "var(--suave)",
                  padding: "0 0 0 8px",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: "12px", color: "var(--suave)", marginBottom: "12px" }}>
              Nossa equipe responde pelo WhatsApp
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25D366",
                color: "#fff",
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                padding: "8px 14px",
                borderRadius: "8px",
                textDecoration: "none",
                display: "block",
                textAlign: "center",
              }}
            >
              Enviar uma mensagem
            </a>
          </div>
        )}

        <button
          onClick={() => setAberto(!aberto)}
          style={{
            background: "#6B6B6B",
            border: "none",
            borderRadius: "50%",
            width: "52px",
            height: "52px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          <img src="/whatsapp.png" alt="WhatsApp" style={{ width: "28px", height: "28px" }} />
        </button>

      </div>

    </div>
  );
}