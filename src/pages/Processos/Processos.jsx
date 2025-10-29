import React, { useState } from "react";
import "./Processos.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import Label from "../../components/Label/Label";
import Modal from "../../components/Modal/Modal";
import {
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  PlusIcon,
  WarningIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { useClientes } from "../../contexts/ClienteContext";

function Processos() {
  const { clientes } = useClientes()
  const [busca, setBusca] = useState("");
  const [processos] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const processosPorPagina = 9;

  const initialProcessoState = {
    numero: "",
    cliente: "",
    area: "",
    prazo: "",
    status: ""
  };

  const [novoProcesso, setNovoProcesso] = useState(initialProcessoState);

  const openModal = (processoToEdit = initialProcessoState, index = null) => {
    setNovoProcesso(processoToEdit);
    setEditingIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError(false);
    setNovoProcesso(initialProcessoState);
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNovoProcesso((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveNew = () => {
    // Para simplificar e evitar warnings, estou reintroduzindo setProcessos temporariamente,
    // mas em um cenário real, você deve gerenciar os IDs corretamente.
    // Neste exemplo, vamos apenas fechar o modal.
    // setProcessos((prev) => [...prev, novoProcesso]);
    closeModal();
  };

  const handleEdit = () => {
    // setProcessos((prev) =>
    //   prev.map((p, i) => (i === editingIndex ? novoProcesso : p))
    // );
    closeModal();
  };

  const handleSave = () => {
    const { numero, titulo, responsavel, status } = novoProcesso;

    if (!numero || !titulo || !responsavel || !status) {
      setFormError(true);
      return;
    }

    if (editingIndex !== null) {
      handleEdit();
    } else {
      handleSaveNew();
    }
  };

  const processosFiltrados = processos.filter(
    (p) =>
      p.numero.toLowerCase().includes(busca.toLowerCase()) ||
      p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      p.responsavel.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(processosFiltrados.length / processosPorPagina);

  const indiceFinal = paginaAtual * processosPorPagina;
  const indiceInicial = indiceFinal - processosPorPagina;

  const processosAtuais = processosFiltrados.slice(indiceInicial, indiceFinal);

  const mudarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaAtual(numeroPagina);
    }
  };


  return (
    <div className="processos-container">
      <div className="header">
        <h1>Processos</h1>
        <Button icon={PlusIcon} handleClick={() => openModal()} className="primary">
          Novo Processo
        </Button>
      </div>

      <div className="input">
        <Input
          startIcon={MagnifyingGlassIcon}
          placeholder="Buscar por número, título ou responsável"
          handleChange={(e) => {
            setBusca(e.target.value);
            setPaginaAtual(1);
          }}
          value={busca}
        />
      </div>

      <div className="table-container">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th className="table-header">Número</th>
              <th className="table-header">Cliente</th>
              <th className="table-header">Área do Direito</th>
              <th className="table-header">Prazo</th>
              <th className="table-header">Status</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {processosAtuais.length > 0 ? (
              processosAtuais.map((p, index) => (
                <tr key={indiceInicial + index} className="data">
                  <td className="table-data">{p.numero}</td>
                  <td className="table-data">{p.cliente}</td>
                  <td className="table-data">{p.area}</td>
                  <td className="table-data">{p.prazo}</td>
                  <td className="table-data">{p.status}</td>
                  <td className="table-data action-cell">
                    <Button
                      icon={PencilSimpleIcon}
                      className="icon"
                      iconWeight="fill"
                      handleClick={() => openModal(p, processos.findIndex(item => item.numero === p.numero))}
                    >
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data">
                <td className="table-data" colSpan="6">
                  Nenhum processo encontrado
                </td>
              </tr>
            )}

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
          </tbody>
        </table>
      </div>


      {showModal && (
        <Modal
          open={showModal}
          onClose={closeModal}
          onSave={handleSave}
          title={editingIndex !== null ? "Editar Processo" : "Novo Processo"}
          subtitle={editingIndex !== null ? "Processos > Editar Processo" : "Processos > Novo Processo"}
        >
          <form>
            <div>
              <fieldset>
                <Label id="numero">Nº processo</Label>
                <Input
                  id="numero"
                  type="text"
                  placeholder="0000/0000"
                  value={novoProcesso.numero}
                  handleChange={handleChange}
                  className={formError && !novoProcesso.numero ? "error" : ""}
                />
              </fieldset>
              <fieldset>
                <Label id="numero">Cliente</Label>
                <Select
                  id="cliente"
                  value={novoProcesso.cliente}
                  handleChange={handleChange}
                  className={formError && !novoProcesso.cliente ? "error" : ""}
                >
                  <option value="">Selecione um cliente</option>
                  {/* Itera sobre a lista de clientes ATUALIZADA do Contexto */}
                  {clientes.map((c, index) => (
                    <option key={index} value={c.nome}>
                      {c.nome} ({c.cpfCnpj})
                    </option>
                  ))}
                </Select>
              </fieldset>
              <fieldset>
                <Label id="numero">Status</Label>
                <Input
                  id="numero"
                  type="text"
                  placeholder="Ex: 0001/2025"
                  value={novoProcesso.numero}
                  handleChange={handleChange}
                  className={formError && !novoProcesso.numero ? "error" : ""}
                />
              </fieldset>
            </div>

            <fieldset>
              <Label id="titulo">Título</Label>
              <Input
                id="titulo"
                type="text"
                placeholder="Título/Assunto do processo"
                value={novoProcesso.titulo}
                handleChange={handleChange}
                className={formError && !novoProcesso.titulo ? "error" : ""}
              />
            </fieldset>

            <div className="two-columns">
              <fieldset>
                <Label id="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  type="text"
                  placeholder="Nome do responsável"
                  value={novoProcesso.responsavel}
                  handleChange={handleChange}
                  className={formError && !novoProcesso.responsavel ? "error" : ""}
                />
              </fieldset>
              <fieldset>
                <Label id="status">Status</Label>
                <Select
                  id="status"
                  value={novoProcesso.status}
                  handleChange={handleChange}
                  className={
                    formError && !novoProcesso.status ? "error" : ""
                  }
                >
                  <option value="">Selecione o Status</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Aguardando Aprovação">Aguardando Aprovação</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Cancelado">Cancelado</option>
                </Select>
              </fieldset>
            </div>

            <fieldset style={{ display: 'none' }}>
              <Label id="dataCriacao">Data de Criação</Label>
              <Input
                id="dataCriacao"
                type="date"
                value={novoProcesso.dataCriacao}
                handleChange={handleChange}
                readOnly
              />
            </fieldset>

          </form>

          {formError && (
            <p className="form-error">
              <WarningIcon size={20} weight="bold" />
              Preencha todos os campos antes de continuar.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Processos;