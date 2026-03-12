// ============================================================
// PÁGINA DE BUSCA
// Arquivo: pages/busca.js
//
// Essa página recebe o texto da busca pela URL (?q=texto)
// e usa a biblioteca Fuse.js para encontrar perguntas similares.
// ============================================================

import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import faqData from "../data/faq.json";

// Monta uma lista plana com TODAS as perguntas de todas as categorias
// (necessário para a busca funcionar em tudo de uma vez)
function todasAsPerguntas() {
  const lista = [];
  faqData.categorias.forEach((cat) => {
    cat.perguntas.forEach((perg) => {
      lista.push({
        ...perg,
        categoriaId: cat.id,
        categoriaTitulo: cat.titulo,
        categoriaEmoji: cat.emoji,
        // "texto" junta pergunta + resposta pra busca ser mais abrangente
        texto: `${perg.pergunta} ${perg.resposta || ""} ${(perg.lista || []).join(" ")} ${(perg.passos || []).join(" ")}`.replace(/\*\*/g, ""),
      });
    });
  });
  return lista;
}

export default function BuscaPagina() {
  const router = useRouter();
  // Pega o texto da URL: /busca?q=publicar+video → q = "publicar video"
  const q = router.query.q || "";

  const perguntas = useMemo(() => todasAsPerguntas(), []);

  // Filtragem simples por palavras — funciona sem biblioteca externa
  // (quando o Fuse.js estiver instalado, pode substituir por ele)
  const resultados = useMemo(() => {
    if (!q.trim()) return [];
    const termo = q.toLowerCase();
    return perguntas.filter((p) =>
      p.texto.toLowerCase().includes(termo)
    );
  }, [q, perguntas]);

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
          }}>
            Início
          </Link>
          <span>›</span>
          <span>Busca</span>
        </div>

        <h1 style={{
          fontFamily: "Sora, sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          marginBottom: "6px",
          color: "var(--escuro)",
        }}>
          Resultados para: <span style={{ color: "var(--verde)" }}>"{q}"</span>
        </h1>
        <p style={{ fontSize: "13px", color: "var(--suave)", marginBottom: "32px" }}>
          {resultados.length} {resultados.length === 1 ? "resultado encontrado" : "resultados encontrados"}
        </p>

        {/* Nenhum resultado */}
        {resultados.length === 0 && (
          <div style={{
            background: "var(--branco)",
            border: "1px solid var(--borda)",
            borderRadius: "10px",
            padding: "40px 24px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "32px", marginBottom: "12px" }}>🌾</p>
            <p style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              color: "var(--escuro)",
              marginBottom: "8px",
            }}>
              Não encontramos nada para "{q}"
            </p>
            <p style={{ fontSize: "13px", color: "var(--suave)", marginBottom: "20px" }}>
              Tente outras palavras ou fale com o nosso suporte
            </p>
            <a
              href="https://wa.me/5511966487654"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25D366",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              💬 Falar com suporte
            </a>
          </div>
        )}

        {/* Lista de resultados */}
        {resultados.map((perg) => (
          <Link
            key={perg.id}
            href={`/categoria/${perg.categoriaId}#${perg.id}`}
            style={{ textDecoration: "none" }}
          >
            <div style={{
              background: "var(--branco)",
              border: "1px solid var(--borda)",
              borderRadius: "10px",
              padding: "16px 20px",
              marginBottom: "10px",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--verde-claro)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--borda)"}
            >
              {/* Categoria do resultado */}
              <div style={{
                fontSize: "11px",
                color: "var(--verde)",
                fontFamily: "Sora, sans-serif",
                fontWeight: 600,
                marginBottom: "6px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                <img src={perg.categoriaEmoji} alt={perg.categoriaTitulo} style={{ width: "16px", height: "16px" }} />
                {perg.categoriaTitulo}
              </div>
              {/* Pergunta */}
              <div style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "var(--escuro)",
                marginBottom: "6px",
              }}>
                {perg.pergunta}
              </div>
              {/* Preview da resposta */}
              {(perg.resposta || perg.introPassos || (perg.passos && perg.passos[0])) && (
                <div style={{
                  fontSize: "13px",
                  color: "var(--suave)",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}>
                  {/* Puxa a resposta, ou a intro, ou o primeiro passo, e tira os negritos */}
                  {(perg.resposta || perg.introPassos || perg.passos[0]).replace(/\*\*/g, "")}
                </div>
              )}
            </div>
          </Link>
        ))}

      </div>
    </Layout>
  );
}
