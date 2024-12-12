import React, { useState } from "react";
import './Roleta.css'; // CSS da roleta

const Roleta = ({ onStop }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalAngle, setFinalAngle] = useState(0);
  const [activeSegment, setActiveSegment] = useState(null); // Estado para o segmento ativo

  const segmentos = [
    { texto: "$800", rotacao: 0 },
    { texto: "PERDE TUDO", rotacao: 22.5 },
    { texto: "$1000", rotacao: 45 },
    { texto: "$300", rotacao: 67.5 },
    { texto: "$500", rotacao: 90 },
    { texto: "$600", rotacao: 112.5 },
    { texto: "$200", rotacao: 135 },
    { texto: "$0", rotacao: 157.5 },
    { texto: "$500", rotacao: 180 },
    { texto: "$600", rotacao: 202.5 },
    { texto: "$200", rotacao: 225 },
    { texto: "$800", rotacao: 247.5 },
    { texto: "PERDE TUDO", rotacao: 270 },
    { texto: "$300", rotacao: 292.5 },
    { texto: "$1000", rotacao: 315 },
    { texto: "$1000", rotacao: 337.5 },
  ];

  const handleSpin = () => {
    setIsSpinning(true);
    setActiveSegment(null); // Limpa o segmento ativo antes de girar

    // Gira a roleta de forma aleatória
    const randomRotation = Math.floor(100 + Math.random() * 360); // Pelo menos 10 rotações completas
    setFinalAngle(randomRotation % 60);

    setTimeout(() => {
      setIsSpinning(false);
      const selectedSegment = segmentos.find((segment, index) => {
        const segmentStart = segment.rotacao;
        const segmentEnd = segment.rotacao + 22.5;
        const isInSegment =
          (segmentStart <= finalAngle && finalAngle < segmentEnd) ||
          (finalAngle < 22.5 && segmentStart === 0);

        if (isInSegment) {
          setActiveSegment(index); // Atualiza o índice do segmento ativo
        }

        return isInSegment;
      });

      onStop(selectedSegment.texto); // Envia o texto do segmento selecionado
    }, 2500);
  };

  return (
    <div className="containerRoulette">
      <div
        className={`roulette ${isSpinning ? "spinning" : ""}`}
        style={{
          transform: `rotate(${isSpinning ? 3600 : finalAngle}deg)`,
        }}
        onClick={handleSpin}
      >
        {segmentos.map((segmento, index) => (
          <div
            key={index}
            className={`segmento ${activeSegment === index ? "active" : ""}`}
            style={{ transform: `rotate(${segmento.rotacao}deg)` }}
          >
            <p>{segmento.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roleta;
