import { useEffect, useRef, useState } from "react";

interface TooltipProps {
  word: string;
  meaning: string;
}

// Definir un tipo que permita opcionalmente 'right'
type TooltipStyle = {
  left?: string;
  right?: string;
  transform?: string;
};

export default function Tooltip({ word, meaning }: TooltipProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const meaningRef = useRef<HTMLSpanElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState<TooltipStyle>({
    left: "50%",
    transform: "translateX(-50%)",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function positionTooltip() {
      if (!wordRef.current || !meaningRef.current) return;

      const wordRect = wordRef.current.getBoundingClientRect();
      const meaningRect = meaningRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      let style: TooltipStyle = { left: "50%", transform: "translateX(-50%)" };

      const isCentered =
        wordRect.left > screenWidth * 0.25 &&
        wordRect.right < screenWidth * 0.75;

      if (isCentered) {
        // Si está en el centro de la pantalla, se alinea correctamente
        style = { left: "50%", transform: "translateX(-50%)" };
      } else if (wordRect.left < 50) {
        // Si está cerca del borde izquierdo
        style = { left: "0%", transform: "none" };
      } else if (wordRect.right + meaningRect.width > screenWidth - 10) {
        // Si está cerca del borde derecho
        style = { right: "0%", left: "auto", transform: "none" };
      }

      setTooltipStyle(style);
    }

    positionTooltip();
    window.addEventListener("resize", positionTooltip);
    return () => window.removeEventListener("resize", positionTooltip);
  }, []);

  // Mostrar tooltip solo al pasar por `word` o `meaning`
  useEffect(() => {
    function showTooltip() {
      setVisible(true);
    }

    function hideTooltip(event: MouseEvent) {
      if (
        wordRef.current &&
        meaningRef.current &&
        !wordRef.current.contains(event.relatedTarget as Node) &&
        !meaningRef.current.contains(event.relatedTarget as Node)
      ) {
        setVisible(false);
      }
    }

    wordRef.current?.addEventListener("mouseenter", showTooltip);
    wordRef.current?.addEventListener("mouseleave", hideTooltip);
    meaningRef.current?.addEventListener("mouseleave", hideTooltip);

    // keyboard accessibility
    const wr = wordRef.current;
    if (wr) {
      wr.addEventListener("focus", showTooltip);
      wr.addEventListener("blur", (e) => {
        // si el foco pasa al tooltip, no ocultar
        const related = (e as FocusEvent).relatedTarget as Node | null;
        if (related && meaningRef.current && meaningRef.current.contains(related)) return;
        setVisible(false);
      });
    }

    return () => {
      wordRef.current?.removeEventListener("mouseenter", showTooltip);
      wordRef.current?.removeEventListener("mouseleave", hideTooltip);
      meaningRef.current?.removeEventListener("mouseleave", hideTooltip);

      if (wr) {
        wr.removeEventListener("focus", showTooltip);
        wr.removeEventListener("blur", () => {});
      }
    };
  }, []);

  return (
    <span className="relative inline-block">
      <span
        ref={wordRef}
        className={`
          hover:brightness-95 bg-ink inline-block px-1 rounded-md transition-all duration-300 font-medium`}
        // estilos visuales nuevos (solo colores / borde / sombra)
        style={
        {
                color: "var(--paper)",
                boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.06)",
                borderRadius: 6,
                paddingLeft: 6,
                paddingRight: 6,
              }
            
        }
      >
        {word}
      </span>

      <span
        ref={meaningRef}
        style={{
          ...tooltipStyle,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
        className="absolute top-full py-1 max-w-[250px] md:max-w-xs w-max transition-opacity duration-300 z-50"
      >
        <span
          // estilo del tooltip: pergamino interior, borde fino y sombra suave
          className="inline-block text-sm md:text-base text-ink-muted"
          style={{
            background: "var(--paper)", // parchment color
            border: "1px solid var(--border)",
            padding: "8px 10px",
            boxShadow: "0 8px 20px rgba(30,30,30,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
            fontFamily: "Crimson Pro, Georgia, serif",
            lineHeight: 1.4,
            maxWidth: 300,
          }}
        >
          {meaning}
        </span>
      </span>
    </span>
  );
}
