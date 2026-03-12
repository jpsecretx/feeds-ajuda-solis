// ============================================================
// PÁGINA DE CATEGORIA
// Arquivo: pages/categoria/[id].js
// ============================================================

import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import faqData from "../../data/faq.json";

const { categorias, config } = faqData;

// ============================================================
// FUNÇÃO DE NEGRITO
// Transforma **texto** em <strong>texto</strong> automaticamente.
// Use **palavra** no faq.json para deixar em negrito.
// ============================================================
function Texto({ children }) {
  if (!children) return null;
  const partes = children.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {partes.map((parte, i) =>
        i % 2 === 1
          ? <strong key={i}>{parte}</strong>
          : parte
      )}
    </span>
  );
}

export async function getStaticPaths() {
  const paths = categorias.map((cat) => ({
    params: { id: cat.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const categoria = categorias.find((c) => c.id === params.id) || null;
  return { props: { categoria } };
}

function PerguntaItem({ pergunta }) {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (window.location.hash === `#${pergunta.id}`) {
      setAberto(true);
      setTimeout(() => {
        const elemento = document.getElementById(pergunta.id);
        if (elemento) {
          elemento.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }, [pergunta.id]);
  
  return (
    <div
      id={pergunta.id}
      style={{
        border: "1px solid var(--borda)",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "10px",
        background: "var(--branco)",
      }}
    >
      <button
        onClick={() => setAberto(!aberto)}
        style={{
          width: "100%",
          padding: "16px 20px",
          background: aberto ? "var(--verde-palido)" : "var(--branco)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          textAlign: "left",
          transition: "background 0.15s",
        }}
      >
        <span style={{
          fontFamily: "Sora, sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          color: aberto ? "var(--verde)" : "var(--escuro)",
          lineHeight: 1.4,
        }}>
          {pergunta.pergunta}
        </span>
        <span style={{
          fontSize: "18px",
          color: "var(--verde)",
          transform: aberto ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
          flexShrink: 0,
        }}>
          ›
        </span>
      </button>

      {aberto && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--borda)" }}>

          {/* Texto principal */}
          {pergunta.resposta && (
            <p style={{ fontSize: "14px", color: "var(--medio)", marginTop: "16px", lineHeight: 1.7 }}>
              <Texto>{pergunta.resposta}</Texto>
            </p>
          )}

          {/* Lista com bullets */}
          {pergunta.introLista && (
            <p style={{ fontSize: "14px", color: "var(--medio)", marginTop: "12px", fontWeight: 600 }}>
              <Texto>{pergunta.introLista}</Texto>
            </p>
          )}
          {pergunta.lista && (
            <ul style={{ marginTop: "8px", paddingLeft: "0", listStyle: "none" }}>
              {pergunta.lista.map((item, i) => (
                <li key={i} style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "14px",
                  color: "var(--medio)",
                  padding: "12px 0",
                  borderBottom: i === pergunta.lista.length - 1 ? "none" : "1px solid var(--borda)",
                  lineHeight: 1.5,
                }}>
                  <span style={{ color: "var(--verde)", fontWeight: 700, flexShrink: 0 }}>•</span>
                  <div><Texto>{item}</Texto></div>
                </li>
              ))}
            </ul>
          )}

          {/* Passos numerados */}
          {pergunta.introPassos && (
            <p style={{ fontSize: "14px", color: "var(--medio)", marginTop: "16px", fontWeight: 600 }}>
              <Texto>{pergunta.introPassos}</Texto>
            </p>
          )}
          {pergunta.passos && (
            <ol style={{ marginTop: "8px", paddingLeft: "0", listStyle: "none" }}>
              {pergunta.passos.map((passo, i) => (
                <li key={i} style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  padding: "12px 0",
                  borderBottom: i === pergunta.passos.length - 1 ? "none" : "1px solid var(--borda)",
                  fontSize: "14px",
                  color: "var(--medio)",
                  lineHeight: 1.5,
                }}>
                  <span style={{
                    background: "var(--verde)",
                    color: "#fff",
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 700,
                    fontSize: "11px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}>
                    {i + 1}
                  </span>
                  <div><Texto>{passo}</Texto></div>
                </li>
              ))}
            </ol>
          )}

          {/* Conclusão */}
          {pergunta.conclusao && (
            <p style={{ fontSize: "13px", color: "var(--medio)", marginTop: "14px", lineHeight: 1.7 }}>
              <Texto>{pergunta.conclusao}</Texto>
            </p>
          )}

          {/* Importante — caixa amarela */}
          {pergunta.importante && (
            <div style={{
              background: "var(--amarelo-palido)",
              border: "1px solid var(--amarelo)",
              borderRadius: "8px",
              padding: "14px 16px",
              marginTop: "16px",
            }}>
              <p style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--escuro)",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                🤔 Importante saber
              </p>
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {pergunta.importante.map((item, i) => (
                  <li key={i} style={{
                    display: "flex", gap: "8px",
                    fontSize: "13px", color: "var(--medio)",
                    padding: "3px 0", lineHeight: 1.5,
                  }}>
                    <span style={{ color: "var(--amarelo)", flexShrink: 0, fontWeight: 700 }}>•</span>
                    <div><Texto>{item}</Texto></div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dica */}
          {pergunta.dica && (
            <div style={{
              background: "var(--amarelo-palido)",
              border: "1px solid #cecece",
              borderRadius: "8px",
              padding: "12px 16px",
              marginTop: "16px",
              fontSize: "13px",
              color: "var(--medio)",
              display: "flex",
              gap: "10px",
            }}>
              <span style={{ flexShrink: 0 }}>💡</span>
              <div><Texto>{pergunta.dica}</Texto></div>
            </div>
          )}

          {/* CTA suporte dentro do tópico */}
          <div style={{
            marginTop: "24px",
            background: "var(--verde-clarinho)",
            border: "1px solid #25D366",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}>
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ 
                fontFamily: "Sora, sans-serif",
                fontSize: "16px", 
                color: "var(--escuro)",
                fontWeight: 700, 
                margin: 0
              }}>
                Ainda precisa de ajuda?
              </p>
              <p style={{ 
                fontSize: "14px", 
                color: "var(--medio)", 
                lineHeight: 1.5,
                margin: "6px 0 0 0",
                textWrap: "balance",
              }}>
                Se o seu problema ainda não foi resolvido, entre em contato com o <strong>Service Desk</strong> para obter suporte. 
                Assim que disponível, um membro da equipe irá fazer o atendimento com você.
              </p>
            </div>

            <a
              href={`https://wa.me/${config.whatsappNumero}?text=${encodeURIComponent(config.whatsappMensagem)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#107836",
                color: "#fff",
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                padding: "8px 12px",
                borderRadius: "5px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <img src="/whatsapp.png" style={{ width: "16px", height: "16px" }} alt="WhatsApp" />
              Service Desk
            </a>
          </div>

        </div>
      )}
    </div>
  );
}

export default function CategoriaPagina({ categoria }) {
  if (!categoria) return <p>Categoria não encontrada.</p>;

  return (
    <Layout>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 20px 64px" }}>

        {/* Breadcrumb */}
        <div style={{
          fontSize: "12px",
          color: "var(--suave)",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          <Link href="/" style={{
            background: "#42C16C",
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
          }}>
            Início
          </Link>
          <span>›</span>
          <span>{categoria.titulo}</span>
        </div>

        {/* Título — ícone com className para inversão no dark mode */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
          <img src={categoria.emoji} alt={categoria.titulo} className="icone-categoria" style={{ width: "40px", height: "40px" }} />
          <div>
            <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "22px", color: "var(--escuro)" }}>
              {categoria.titulo}
            </h1>
            <p style={{ fontSize: "13px", color: "var(--suave)", marginTop: "2px" }}>
              {categoria.perguntas.length} {categoria.perguntas.length === 1 ? "publicação" : "publicações"}
            </p>
          </div>
        </div>

        {/* Perguntas */}
        {categoria.perguntas.map((perg) => (
          <PerguntaItem key={perg.id} pergunta={perg} />
        ))}

      </div>
    </Layout>
  );
}