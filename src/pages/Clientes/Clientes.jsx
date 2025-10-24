import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Clientes.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import Label from "../../components/Label/Label";
import Modal from "../../components/Modal/Modal";
import {
  ArrowSquareOutIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  PlusIcon,
} from "@phosphor-icons/react";

function Clientes() {
  let navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const clientesFiltrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleSave = () => {
    closeModal();
  }

  const redirectToAddProcess = (e) => {
    e.preventDefault(); 
    handleSave();
    navigate('/processos');
  }

  return (
    <div className="clientes-container">
      <div className="header">
        <h1>Clientes</h1>
        <Button icon={PlusIcon} handleClick={openModal}>Novo Cliente</Button>
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
              <th className="table-header">Qtd. Processos</th>
              <th className="table-header">Editar</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((c, index) => (
                <tr key={index}>
                  <td className="table-data">{c.nome}</td>
                  <td className="table-data">{c.email}</td>
                  <td className="table-data">{c.telefone}</td>
                  <td className="table-data">{c.cpfCnpj}</td>
                  <td className="table-data">{c.qtdProcessos}</td>
                  <td className="table-data">
                    <PencilSimpleIcon weight="fill" size={16} />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data">
                <td className="table-data" colSpan="6" style={{ textAlign: "center" }}>
                  Nenhum cliente encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {
        showModal && (
          <Modal
            open={showModal}
            onClose={closeModal}
            onSave={handleSave}
            title="Novo Cliente"
          >
            <form>
              <fieldset>
                <Label id="name">Nome</Label>
                <Input id="name" type="text" placeholder="Nome do cliente" />
              </fieldset>
              <div className="two-columns">
                <fieldset>
                  <Label id="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="exemplo@email.com" />
                </fieldset>
                <fieldset>
                  <Label id="phone">Telefone</Label>
                  <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
                </fieldset>
              </div>
              <div className="two-columns">
                <fieldset>
                  <Label id="cpfCnpj">CPF/CNPJ</Label>
                  <Input id="cpfCnpj" type="text" placeholder="00.000.000/0000-00" />
                </fieldset>
                <fieldset>
                  <Label id="clientType">Tipo de Cliente</Label>
                  <Select id="clientType">
                    <option value="">Selecione o tipo</option>
                    <option value="individual">Pessoa Física</option>
                    <option value="company">Pessoa Jurídica</option>
                  </Select>
                </fieldset>
              </div>
              <a className="form-link" href="/processos" onClick={redirectToAddProcess}>
                <ArrowSquareOutIcon size={15} weight="bold" />
                Adicionar processo relacionado
              </a>
            </form>
          </Modal>
        )}
    </div>
  );
}

export default Clientes;
