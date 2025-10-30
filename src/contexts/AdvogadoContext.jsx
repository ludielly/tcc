import React, { createContext, useContext, useState } from "react";

// 1️⃣ Cria o contexto
const AdvogadoContext = createContext();

// 2️⃣ Hook para acessar o contexto facilmente
export const useAdvogados = () => useContext(AdvogadoContext);

// 3️⃣ Provider que vai envolver a aplicação
export const AdvogadoProvider = ({ children }) => {
  // Lista de advogados (pode começar vazia ou com exemplos)
  const [advogados, setAdvogados] = useState([
    { nome: "Ana Paula Rocha", numeroOab: "OAB/SP nº 123456", cpf: "111.222.333-44", email: "ana.paula@adv.com" },
    { nome: "Carlos Eduardo Santos", numeroOab: "OAB/RJ nº 987654", cpf: "555.666.777-88", email: "carlos.santos@adv.com" },
    { nome: "Mariana Costa Oliveira", numeroOab: "OAB/MG nº 345678", cpf: "222.333.444-55", email: "mariana.oliveira@adv.com" },
    { nome: "Ricardo Almeida Lima", numeroOab: "OAB/BA nº 109876", cpf: "666.777.888-99", email: "ricardo.lima@adv.com" },
    { nome: "Juliana Mendes Silva", numeroOab: "OAB/PR nº 456789", cpf: "333.444.555-66", email: "juliana.silva@adv.com" },
    { nome: "Fernando Henrique Diniz", numeroOab: "OAB/RS nº 210987", cpf: "777.888.999-00", email: "fernando.diniz@adv.com" },
    { nome: "Gabriela Farias Gomes", numeroOab: "OAB/SC nº 567890", cpf: "444.555.666-77", email: "gabriela.gomes@adv.com" },
    { nome: "Hélio Borges Neto", numeroOab: "OAB/PE nº 321098", cpf: "888.999.000-11", email: "helio.neto@adv.com" },
    { nome: "Isabela Teixeira Moura", numeroOab: "OAB/DF nº 678901", cpf: "999.000.111-22", email: "isabela.moura@adv.com" },
    // Dados adicionais para testar a paginação (total de 12)
    { nome: "Jonas Queiroz Passos", numeroOab: "OAB/GO nº 789012", cpf: "101.112.131-41", email: "jonas.passos@adv.com" },
    { nome: "Larissa Valente Nunes", numeroOab: "OAB/ES nº 890123", cpf: "121.314.151-61", email: "larissa.nunes@adv.com" },
    { nome: "Marcos Oliveira Brito", numeroOab: "OAB/CE nº 901234", cpf: "171.819.202-12", email: "marcos.brito@adv.com" },
  ]);

  // Adiciona novo advogado
  const addAdvogado = (novoAdvogado) => {
    setAdvogados((prev) => [...prev, novoAdvogado]);
  };

  // Edita advogado existente
  const editAdvogado = (index, advogadoAtualizado) => {
    setAdvogados((prev) =>
      prev.map((a, i) => (i === index ? advogadoAtualizado : a))
    );
  };

  // Remove advogado (opcional, se quiser)
  const removeAdvogado = (cpf) => {
    setAdvogados((prev) => prev.filter((a) => a.cpf !== cpf));
  };

  return (
    <AdvogadoContext.Provider
      value={{ advogados, addAdvogado, editAdvogado, removeAdvogado }}
    >
      {children}
    </AdvogadoContext.Provider>
  );
};
