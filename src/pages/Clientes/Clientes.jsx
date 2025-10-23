import React, { useState } from 'react'
import "./Clientes.css"
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Modal from '../../components/Modal/Modal'
import { MagnifyingGlassIcon, PencilSimpleIcon, PlusIcon } from '@phosphor-icons/react'

function Clientes() {
  const [busca, setBusca] = useState("");
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpfCnpj: "",
    qtdProcessos: 0,
  });

  // Filtragem
  const clientesFiltrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Abrir e fechar modal
  const openModal = () => setShowModal(true);
  const fecharModal = () => setShowModal(false);

  // Atualizar dados do novo cliente
  const handleChangeNovoCliente = (e) => {
    const { name, value } = e.target;
    setNovoCliente((prev) => ({ ...prev, [name]: value }));
  };

  // Adicionar cliente à lista
  const handleSave = () => {
    if (!novoCliente.nome || !novoCliente.email) {
      alert("Preencha pelo menos nome e e-mail!");
      return;
    }

    setClientes((prev) => [...prev, novoCliente]);
    setNovoCliente({
      nome: "",
      email: "",
      telefone: "",
      cpfCnpj: "",
      qtdProcessos: 0,
    });
    fecharModal();

    return (
      <div className="clientes-container">
        {/* Cabeçalho */}
        <div className="header">
          <h1>Clientes</h1>
          <Button icon={PlusIcon} handleClick={openModal}>
            Novo Cliente
          </Button>
        </div>

        {/* Campo de busca */}
        <div className="input">
          <Input
            startIcon={MagnifyingGlassIcon}
            placeholder="Buscar cliente"
            handleChange={(e) => setBusca(e.target.value)}
            value={busca}
          />
        </div>

        {/* Tabela */}
        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>CPF/CNPJ</th>
                <th>Qtd. Processos</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((c, index) => (
                  <tr key={index}>
                    <td>{c.nome}</td>
                    <td>{c.email}</td>
                    <td>{c.telefone}</td>
                    <td>{c.cpfCnpj}</td>
                    <td>{c.qtdProcessos}</td>
                    <td>
                      <PencilSimpleIcon weight="fill" size={16} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Nenhum cliente encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


        {showModal && (
          <Modal title="Novo Cliente" subtitle="Cliente > Novo Cliente" onSave={handleSave}>
            <form>
             teste
            </form>
          </Modal>
        )}
      </div>

    )
  }
}

export default Clientes