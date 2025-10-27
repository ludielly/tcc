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
} from "@phosphor-icons/react";

function Clientes() {
  const [busca, setBusca] = useState("");
  const [clientes, setClientes] = useState([
    {
      nome: "João Silva",
      email: "joao.silva@exemplo.com",
      telefone: "(11) 98765-4321",
      cpfCnpj: "123.456.789-00",
      tipoCliente: "Pessoa Física",
    },
    {
      nome: "Empresa XPTO Ltda",
      email: "contato@xpto.com.br",
      telefone: "(21) 3000-0000",
      cpfCnpj: "00.000.000/0001-00",
      tipoCliente: "Pessoa Jurídica",
    },
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

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase())
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNovoCliente((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveNew = () => {
    setClientes((prev) => [...prev, novoCliente]);
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
          handleChange={(e) => setBusca(e.target.value)}
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
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((c, index) => (
                <tr key={index} className="data">
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
                      handleClick={() => openModal(c, index)}
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

            <div className="two-columns">
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

            <div className="two-columns">
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