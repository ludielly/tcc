import React from 'react'
import "./Tag.css"

export function Tag({ type }) {
  const types = {
    inativo: { className: "tag nao-iniciado", text: "Não iniciado"},
    andamento: { className: "tag em-andamento", text: "Em andamento" },
    recurso: { className: "tag em-recurso", text: "Em recurso" },
    suspenso: { className: "tag suspenso", text: "Suspenso" },
    encerrado: { className: "tag encerrado", text: "Encerrado" },
  };

  const { text, className } = types[type] || {
    text: "Não iniciado",
    className: "tag nao-iniciado",
  };

  return <span className={className}>{text}</span>;
}

export default Tag