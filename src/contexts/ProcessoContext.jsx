import React, { createContext, useContext, useState } from "react";

const ProcessoContext = createContext();

export const useProcessos = () => useContext(ProcessoContext);

export const ProcessoProvider = ({ children }) => {
  const [processos, setProcessos] = useState([]);

  const addProcesso = (novoProcesso) => {
    setProcessos((prev) => [...prev, novoProcesso]);
  };

  const editProcesso = (index, processoAtualizado) => {
    setProcessos((prev) =>
      prev.map((p, i) => (i === index ? processoAtualizado : p))
    );
  };

  const removeProcesso = (numero) => {
    setProcessos((prev) => prev.filter((p) => p.numero !== numero));
  };

  return (
    <ProcessoContext.Provider
      value={{ processos, addProcesso, editProcesso, removeProcesso }}
    >
      {children}
    </ProcessoContext.Provider>
  );
};
