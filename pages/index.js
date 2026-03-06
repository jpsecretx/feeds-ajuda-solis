// ============================================================
// PÁGINA INICIAL (HOME)
// ============================================================

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import faqData from "../data/faq.json";

const { categorias, maisPopulares } = faqData;

// Componente que gerencia o clique no vídeo para rodar na tela
function VideoCard({ video }) {
  const [tocando, setTocando] = useState(false);

  return (
    <div style={{
      height: "100%",
      background: "var(--branco)",
      border: "1px solid var(--borda)",
      borderRadius: "10px",
      overflow: "hidden",
      transition: "border-color 0.15s, box-shadow 0.15s",
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--verde-claro)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(45,106,79,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--borda)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {tocando ? (
        <iframe
          width="100%"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: "block", aspectRatio: "9/16" }}
        ></iframe>
      ) : (
        <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setTocando(true)}>
          <img
            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.titulo}
            style={{ width: "100%", display: "block", aspectRatio: "9/16", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.2)",
          }}>
            <div style={{
              background: "rgba(0,0,0,0.8)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontSize: "14px", marginLeft: "2px" }}>▶</span>
            </div>
          </div>
        </div>
      )}
      
      <div style={{ padding: "10px 12px", height: "48px" }}>
        <p style={{
          fontFamily: "Sora, sans-serif",
          fontWeight: 600,
          fontSize: "12px",
          color: "var(--escuro)",
          lineHeight: 1.4,
          margin: 0,
          textWrap: "balance",
          wordBreak: "break-word"
        }}>
          {video.titulo}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [busca, setBusca] = useState("");
  const [fotoAtual, setFotoAtual] = useState(1);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFotoAtual((atual) => atual === 8 ? 1 : atual + 1);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  const router = useRouter();

  function handleBusca(e) {
    e.preventDefault();
    if (busca.trim()) {
      router.push(`/busca?q=${encodeURIComponent(busca.trim())}`);
    }
  }

  const perguntasPopulares = maisPopulares.map(({ categoriaId, perguntaId }) => {
    const cat = categorias.find((c) => c.id === categoriaId);
    const perg = cat?.perguntas.find((p) => p.id === perguntaId);
    return { ...perg, categoriaId };
  });

  return (
    <Layout>

      {/* ── HERO com busca ── */}
      <div style={{
        background: `url('/cenario${fotoAtual}.jpg') center/cover no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px 20px 56px",
        textAlign: "center",
        minHeight: "280px",
      }}>

        {/* Botão Voltar ao Feeds — verde, igual ao breadcrumb */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <a
            href="https://solisapp.org"
            style={{
              background: "#42c16c",
              color: "#fff",
              textDecoration: "none",
              padding: "4px 12px",
              borderRadius: "6px",
              fontFamily: "Sora, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            ‹ Voltar ao Feeds
          </a>
        </div>

        {/* Título com fundo semitransparente para legibilidade */}
        <div style={{
          display: "inline-block",
          background: "rgba(0,0,0,0.10)",
          borderRadius: "12px",
          padding: "16px 16px",
          marginBottom: "20px",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          <h1 style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(20px, 5vw, 30px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "6px",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}>
            Como podemos te ajudar?
          </h1>
          <p style={{
            color: "#f0f0f0",
            fontSize: "14px",
            margin: 0,
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}>
            Encontre abaixo as respostas para você aproveitar ao máximo o Feeds
          </p>
        </div>

        <form onSubmit={handleBusca} style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Digite aqui o que você procura"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                flex: 1,
                padding: "13px 18px",
                borderRadius: "8px",
                border: "none",
                fontSize: "13px",
                fontFamily: "Arial, sans-serif",
                outline: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#42c16c",
                border: "none",
                borderRadius: "8px",
                padding: "0 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <img src="icones/search.png" alt="Buscar" style={{ width: "18px", height: "18px" }} />
            </button>
          </div>
        </form>
      </div>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 20px" }}>

        {/* Grid de categorias */}
        <h2 style={{
          fontFamily: "Sora, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--suave)",
          marginBottom: "16px",
        }}>
          Tópicos de dúvidas
        </h2>

        <div className="grid-4-colunas">
          {categorias.map((cat) => (
            <Link key={cat.id} href={`/categoria/${cat.id}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                height: "100%",
                background: "var(--branco)",
                border: "1px solid var(--borda)",
                borderRadius: "10px",
                padding: "18px 16px",
                cursor: "pointer",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--verde-claro)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(45,106,79,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--borda)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img src={cat.emoji} alt={cat.titulo} className="icone-categoria" style={{ width: "32px", height: "32px", marginBottom: "8px" }} />
                <div style={{
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "var(--escuro)",
                  marginBottom: "4px",
                  lineHeight: 1.3,
                  textWrap: "balance",
                  wordBreak: "break-word"
                }}>
                  {cat.titulo}
                </div>
                <div style={{ fontSize: "12px", color: "var(--suave)" }}>
                  {cat.perguntas.length} {cat.perguntas.length === 1 ? "publicação" : "publicações"}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Perguntas mais populares */}
        <h2 style={{
          fontFamily: "Sora, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--suave)",
          marginBottom: "16px",
        }}>
          Dúvidas mais frequentes
        </h2>

        <div style={{
          background: "var(--branco)",
          border: "1px solid var(--borda)",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "48px",
        }}>
          {perguntasPopulares.map((perg, i) => (
            <Link
              key={perg.id}
              href={`/categoria/${perg.categoriaId}#${perg.id}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 18px",
                borderBottom: i < perguntasPopulares.length - 1 ? "1px solid var(--borda)" : "none",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--verde-palido)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <span style={{
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#42c16c",
                  width: "20px",
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: "14px", color: "var(--medio)", fontWeight: 600, flex: 1 }}>
                  {perg.pergunta}
                </span>
                <span style={{ color: "var(--suave)", fontSize: "16px" }}>›</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── VÍDEOS QUE PODEM TE AJUDAR ── */}
        <h2 style={{
          fontFamily: "Sora, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--suave)",
          marginBottom: "16px",
          marginTop: "48px",
        }}>
          Vídeos que podem te ajudar
        </h2>

        <div className="grid-4-colunas">
          {faqData.videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </Layout>
  );
}