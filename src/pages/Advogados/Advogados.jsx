import React, { useState } from "react";
import "./Advogados.css"
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import Modal from "../../components/Modal/Modal";
import {
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  PlusIcon,
  WarningIcon,
  CaretLeft, // Importando ícone de seta esquerda
  CaretRight,
  CaretLeftIcon,
  CaretRightIcon, // Importando ícone de seta direita
} from "@phosphor-icons/react";
import { useAdvogados } from "../../contexts/AdvogadoContext";

function Advogados() {

  // --- Paginação States ---
  const [paginaAtual, setPaginaAtual] = useState(1);
  const advogadosPorPagina = 9; // Limite de 9 linhas na tabela
  // -----------------------

  const [busca, setBusca] = useState("");
  const { advogados, addAdvogado, editAdvogado } = useAdvogados();


  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const initialAdvogadoState = {
    nome: "",
    numeroOab: "",
    cpf: "",
    email: ""
  };

  const [novoAdvogado, setNovoAdvogado] = useState(initialAdvogadoState);

  // Funções do Modal (Mantidas)
  const openModal = (advogadoToEdit = initialAdvogadoState, index = null) => {
    setNovoAdvogado(advogadoToEdit);
    setEditingIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError(false);
    setNovoAdvogado(initialAdvogadoState);
    setEditingIndex(null);
  };

  // --- Lógica de Filtragem ---
  const advogadosFiltrados = advogados.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase()) || a.email.toLowerCase().includes(busca.toLowerCase())
  );

  // --- Lógica de Paginação ---
  const totalPaginas = Math.ceil(advogadosFiltrados.length / advogadosPorPagina);
  const indiceFinal = paginaAtual * advogadosPorPagina;
  const indiceInicial = indiceFinal - advogadosPorPagina;

  // Advogados a serem exibidos na página atual (após a filtragem)
  const advogadosAtuais = advogadosFiltrados.slice(indiceInicial, indiceFinal);

  const mudarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaAtual(numeroPagina);
    }
  };
  // --------------------------


  const handleChange = (e) => {
    const { id, value } = e.target;
    setNovoAdvogado((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveNew = () => {
    addAdvogado(novoAdvogado);
    closeModal();
  };

  const handleEdit = () => {
    editAdvogado(editingIndex, novoAdvogado);
    closeModal();
  };


  const handleSave = () => {
    const { nome, numeroOab, cpf, email } = novoAdvogado;

    if (!nome || !numeroOab || !cpf || !email) {
      setFormError(true);
      return;
    }

    if (editingIndex !== null) {
      handleEdit();
    } else {
      handleSaveNew();
    }
  };

  return (
    <div className="advogados-container">
      <div className="header">
        <h1>Advogados</h1>
        <Button icon={PlusIcon} handleClick={() => openModal()} className="primary">
          Novo Advogado
        </Button>
      </div>

      <div className="input">
        <Input
          startIcon={MagnifyingGlassIcon}
          placeholder="Buscar advogado por nome ou e-mail"
          handleChange={(e) => {
            setBusca(e.target.value);
            setPaginaAtual(1); // Resetar para a primeira página ao buscar
          }}
          value={busca}
        />
      </div>

      <div className="table-container">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th className="table-header">Nome</th>
              <th className="table-header">nº OAB</th>
              <th className="table-header">CPF</th>
              <th className="table-header">E-mail</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {/* Renderiza apenas os advogados da página atual */}
            {advogadosAtuais.length > 0 ? (
              advogadosAtuais.map((a, index) => (
                <tr key={indiceInicial + index} className="data">
                  <td className="table-data">{a.nome}</td>
                  <td className="table-data">{a.numeroOab}</td>
                  <td className="table-data">{a.cpf}</td>
                  <td className="table-data">{a.email}</td>
                  <td className="table-data action-cell">
                    <Button
                      icon={PencilSimpleIcon}
                      className="icon"
                      iconWeight="fill"
                      // Encontra o índice no array de advogados original para edição
                      handleClick={() => openModal(a, advogados.findIndex(item => item.cpf === a.cpf))}
                    >
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data">
                <td className="table-data" colSpan="5">
                  Nenhum advogado encontrado
                </td>
              </tr>
            )}
          </tbody>
          {/* --- Componente de Paginação --- */}
          {totalPaginas > 1 && (
            <div className="pagination-container">
              <Button
                icon={CaretLeftIcon}
                handleClick={() => mudarPagina(paginaAtual - 1)}
                disabled={paginaAtual === 1}
                className="icon"
              >
              </Button>

              <span className="page-info">
                {paginaAtual} / {totalPaginas}
              </span>

              <Button
                icon={CaretRightIcon}
                handleClick={() => mudarPagina(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas}
                className="icon"
              >
              </Button>
            </div>
          )}
          {/* --- Fim da Paginação --- */}

        </table>
      </div>

      {showModal && (
        <Modal
          open={showModal}
          onClose={closeModal}
          onSave={handleSave}
          title={editingIndex !== null ? "Editar Advogado" : "Novo Advogado"}
          subtitle={editingIndex !== null ? "Advogados > Editar Advogado" : "Advogados > Novo Advogado"}
        >
          <form>
            <div className="columns">
              <fieldset>
                <Label id="nome">Nome</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Nome do advogado"
                  value={novoAdvogado.nome}
                  handleChange={handleChange}
                  className={formError && !novoAdvogado.nome ? "error" : ""}
                />
              </fieldset>
              <fieldset>
                <Label id="numeroOab">nº OAB</Label>
                <Input
                  id="numeroOab"
                  type="text"
                  placeholder="OAB/UF nº 000000"
                  value={novoAdvogado.numeroOab}
                  handleChange={handleChange}
                  className={formError && !novoAdvogado.numeroOab ? "error" : ""}
                />
              </fieldset>
            </div>

            <div className="columns">
              <fieldset>
                <Label id="cpf">CPF</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={novoAdvogado.cpf}
                  handleChange={handleChange}
                  className={formError && !novoAdvogado.cpf ? "error" : ""}
                />
              </fieldset>
              <fieldset>
                <Label id="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={novoAdvogado.email}
                  handleChange={handleChange}
                  className={formError && !novoAdvogado.email ? "error" : ""}
                />
              </fieldset>
            </div>
          </form>

          {formError && (
            <p className="form-error">
              <WarningIcon size={20} weight="bold" /> Preencha todos os campos antes de continuar.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Advogados;