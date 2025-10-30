import React, { useState } from "react";
import "./Clientes.css";
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
  CaretLeft, // Importando ícone de seta esquerda
  CaretRight,
  CaretLeftIcon,
  CaretRightIcon, // Importando ícone de seta direita
} from "@phosphor-icons/react";

function Clientes() {
  // --- Paginação States ---
  const [paginaAtual, setPaginaAtual] = useState(1);
  const clientesPorPagina = 9; // Limite de 9 linhas
  // -----------------------

  const [busca, setBusca] = useState("");
  const [clientes, setClientes] = useState([
    // 10 clientes de exemplo para testar a paginação
    { nome: "João Silva", email: "joao.silva@exemplo.com", telefone: "(11) 98765-4321", cpfCnpj: "123.456.789-00", tipoCliente: "Pessoa Física" },
    { nome: "Empresa XPTO Ltda", email: "contato@xpto.com.br", telefone: "(21) 3000-0000", cpfCnpj: "00.000.000/0001-00", tipoCliente: "Pessoa Jurídica" },
    { nome: "Maria Oliveira", email: "maria.oliver@exemplo.com", telefone: "(11) 91111-2222", cpfCnpj: "987.654.321-00", tipoCliente: "Pessoa Física" },
    { nome: "Tech Solutions S.A.", email: "info@tech.com", telefone: "(31) 4000-1000", cpfCnpj: "11.222.333/0001-44", tipoCliente: "Pessoa Jurídica" },
    { nome: "Pedro Rocha", email: "pedro.rocha@email.com", telefone: "(19) 90000-1234", cpfCnpj: "444.555.666-77", tipoCliente: "Pessoa Física" },
    { nome: "Comércio Alpha Ltda", email: "vendas@alpha.com", telefone: "(27) 5000-5000", cpfCnpj: "22.333.444/0001-55", tipoCliente: "Pessoa Jurídica" },
    { nome: "Camila Santos", email: "c.santos@exemplo.com", telefone: "(61) 97777-6666", cpfCnpj: "777.888.999-00", tipoCliente: "Pessoa Física" },
    { nome: "Beta Consultoria", email: "atendimento@beta.net", telefone: "(41) 3500-2000", cpfCnpj: "33.444.555/0001-66", tipoCliente: "Pessoa Jurídica" },
    { nome: "Rafael Lima", email: "rafael.lima@mail.com", telefone: "(81) 96666-5555", cpfCnpj: "101.202.303-40", tipoCliente: "Pessoa Física" },
    { nome: "Global Ventures Inc", email: "suporte@global.org", telefone: "(51) 3900-3900", cpfCnpj: "44.555.666/0001-77", tipoCliente: "Pessoa Jurídica" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const initialClientState = {
    nome: "",
    email: "",
    telefone: "",
    cpfCnpj: "",
    tipoCliente: "",
  };

  const [novoCliente, setNovoCliente] = useState(initialClientState);

  // Funções de Modal
  const openModal = (clientToEdit = initialClientState, index = null) => {
    setNovoCliente(clientToEdit);
    setEditingIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError(false);
    setNovoCliente(initialClientState);
    setEditingIndex(null);
  };

  // --- Lógica de Filtragem ---
  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase())
  );
  // -------------------------

  // --- Lógica de Paginação ---
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);
  const indiceFinal = paginaAtual * clientesPorPagina;
  const indiceInicial = indiceFinal - clientesPorPagina;

  // Clientes a serem exibidos na página atual (após a filtragem)
  const clientesAtuais = clientesFiltrados.slice(indiceInicial, indiceFinal);

  const mudarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaAtual(numeroPagina);
    }
  };
  // -------------------------

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNovoCliente((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveNew = () => {
    setClientes((prev) => [...prev, novoCliente]);
    setPaginaAtual(1); // Resetar para a primeira página após adicionar
    closeModal();
  };

  const handleEdit = () => {
    setClientes((prev) =>
      prev.map((c, i) => (i === editingIndex ? novoCliente : c))
    );
    closeModal();
  };

  const handleSave = () => {
    const { nome, email, telefone, cpfCnpj, tipoCliente } = novoCliente;

    if (!nome || !email || !telefone || !cpfCnpj || !tipoCliente) {
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
    <div className="clientes-container">
      <div className="header">
        <h1>Clientes</h1>
        <Button icon={PlusIcon} handleClick={() => openModal()} className="primary">
          Novo Cliente
        </Button>
      </div>

      <div className="input">
        <Input
          startIcon={MagnifyingGlassIcon}
          placeholder="Buscar cliente"
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
              <th className="table-header">E-mail</th>
              <th className="table-header">Telefone</th>
              <th className="table-header">CPF/CNPJ</th>
              <th className="table-header">Tipo de Cliente</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {/* Renderiza apenas os clientes da página atual */}
            {clientesAtuais.length > 0 ? (
              clientesAtuais.map((c, index) => (
                // Usando indiceInicial + index como chave para garantir exclusividade na tabela
                <tr key={indiceInicial + index} className="data"> 
                  <td className="table-data">{c.nome}</td>
                  <td className="table-data">{c.email}</td>
                  <td className="table-data">{c.telefone}</td>
                  <td className="table-data">{c.cpfCnpj}</td>
                  <td className="table-data">{c.tipoCliente}</td>
                  <td className="table-data action-cell">
                    <Button
                      icon={PencilSimpleIcon}
                      className="icon"
                      iconWeight="fill"
                      // Passa o índice no array original/filtrado para edição
                      handleClick={() => openModal(c, clientes.findIndex(item => item.cpfCnpj === c.cpfCnpj))}
                    >
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data">
                <td className="table-data" colSpan="6">
                  Nenhum cliente encontrado
                </td>
              </tr>
            )}
          </tbody>
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
        </table>
      </div>

      {showModal && (
        <Modal
          open={showModal}
          onClose={closeModal}
          onSave={handleSave}
          title={editingIndex !== null ? "Editar Cliente" : "Novo Cliente"}
          subtitle={editingIndex !== null ? "Clientes > Editar Cliente" : "Clientes > Novo Cliente"}
        >
          <form>
            <fieldset>
              <Label id="nome">Nome</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Nome do cliente"
                value={novoCliente.nome}
                handleChange={handleChange}
                className={formError && !novoCliente.nome ? "error" : ""}
              />
            </fieldset>

            <div className="columns">
              <fieldset>
                <Label id="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={novoCliente.email}
                  handleChange={handleChange}
                  className={formError && !novoCliente.email ? "error" : ""}
                />
              </fieldset>
              <fieldset>
                <Label id="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={novoCliente.telefone}
                  handleChange={handleChange}
                  className={formError && !novoCliente.telefone ? "error" : ""}
                />
              </fieldset>
            </div>

            <div className="columns">
              <fieldset>
                <Label id="cpfCnpj">CPF/CNPJ</Label>
                <Input
                  id="cpfCnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={novoCliente.cpfCnpj}
                  handleChange={handleChange}
                  className={formError && !novoCliente.cpfCnpj ? "error" : ""}
                />
              </fieldset>
              <fieldset>
                <Label id="tipoCliente">Tipo de Cliente</Label>
                <Select
                  id="tipoCliente"
                  value={novoCliente.tipoCliente}
                  handleChange={handleChange}
                  className={
                    formError && !novoCliente.tipoCliente ? "error" : ""
                  }
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Pessoa Física">Pessoa Física</option>
                  <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                </Select>
              </fieldset>
            </div>
          </form>

          {formError && (
            <p className="form-error">
              <WarningIcon size={20} weight="bold" /> Preencha todos os campos
              antes de continuar.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Clientes;