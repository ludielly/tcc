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
  TrashIcon,
} from "@phosphor-icons/react";
import { useClientes } from "../../contexts/ClienteContext";
import { useAdvogados } from "../../contexts/AdvogadoContext";
import { useProcessos } from "../../contexts/ProcessoContext";

function Processos() {
  const { clientes } = useClientes();
  const { advogados } = useAdvogados();
  const { processos, addProcesso, editProcesso } = useProcessos();

  const [busca, setBusca] = useState("");
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
    status: "",
    partes: [{ nome: "", tipo: "" }],
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
    addProcesso(novoProcesso);
    setPaginaAtual(1);
    closeModal();
  };

  // ✅ Editar processo existente
  const handleEdit = () => {
    editProcesso(editingIndex, novoProcesso);
    closeModal();
  };

  // ✅ Validação e chamada de salvar
  const handleSave = () => {
    const { numero, cliente, status } = novoProcesso;

    if (!numero || !cliente || !status) {
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
      p.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      p.status.toLowerCase().includes(busca.toLowerCase())
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

  const handleParteChange = (index, field, value) => {
    setNovoProcesso((prev) => {
      const novasPartes = [...prev.partes];
      novasPartes[index][field] = value;
      return { ...prev, partes: novasPartes };
    });
  };

  // Adiciona uma nova linha de parte
  const handleAddParte = () => {
    setNovoProcesso((prev) => ({
      ...prev,
      partes: [...prev.partes, { nome: "", tipo: "" }],
    }));
  };

  // Remove uma linha de parte
  const handleRemoveParte = (index) => {
    setNovoProcesso((prev) => ({
      ...prev,
      partes: prev.partes.filter((_, i) => i !== index),
    }));
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
            <div className="columns">
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
              <fieldset className="bigger">
                <Label id="numero">Cliente</Label>
                <Select
                  id="cliente"
                  value={novoProcesso.cliente}
                  handleChange={handleChange}
                  className={formError && !novoProcesso.cliente ? "error" : ""}
                >
                  <option value="">Selecionar cliente</option>
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
            <div className="partes-section">
              {novoProcesso.partes.map((parte, index) => (
                <div key={index} className="columns parte-linha">
                  {/* Parte (Cliente ou Advogado) */}
                  <fieldset className="bigger">
                    {index === 0 && <Label id={`parte-${index}`}>Parte</Label>}
                    <Select
                      id={`parte-${index}`}
                      value={parte.nome}
                      handleChange={(e) => handleParteChange(index, "nome", e.target.value)}
                    >
                      <option value="">Adicionar parte envolvida</option>

                      <optgroup label="Clientes">
                        {clientes.map((c, i) => (
                          <option key={`cliente-${i}`} value={c.nome}>
                            {c.nome} ({c.cpfCnpj})
                          </option>
                        ))}
                      </optgroup>

                      <optgroup label="Advogados">
                        {advogados.map((a, i) => (
                          <option key={`adv-${i}`} value={a.nome}>
                            {a.nome} ({a.cpf})
                          </option>
                        ))}
                      </optgroup>
                    </Select>
                  </fieldset>

                  {/* Tipo da Parte */}
                  <fieldset>
                    {index === 0 && <Label id={`tipoParte-${index}`}>Tipo da Parte</Label>}
                    <div className="parte-tipo-wrapper">
                      <Select
                        id={`tipoParte-${index}`}
                        value={parte.tipo}
                        handleChange={(e) => handleParteChange(index, "tipo", e.target.value)}
                      >
                        <option value="">Selecione o tipo da parte</option>
                        <option value="Autor">Autor</option>
                        <option value="Réu">Réu</option>
                        <option value="Requerente">Requerente</option>
                        <option value="Requerido">Requerido</option>
                        <option value="Exequente">Exequente</option>
                        <option value="Executado">Executado</option>
                        <option value="Advogado">Advogado</option>
                        <option value="Procurador">Procurador</option>
                        <option value="Testemunha">Testemunha</option>
                        <option value="Perito">Perito</option>
                        <option value="Assistente Técnico">Assistente Técnico</option>
                        <option value="Litisconsorte">Litisconsorte</option>
                        <option value="Terceiro Interessado">Terceiro Interessado</option>
                        <option value="Amicus Curiae">Amicus Curiae</option>
                      </Select>

                      {/* Botão de remover (não aparece na primeira linha) */}
                      {index > 0 && (
                        <Button
                          icon={TrashIcon}
                          handleClick={() => handleRemoveParte(index)}
                          className="icon remove"
                          iconWeight="fill"
                          title="Remover esta parte"
                        />
                      )}
                    </div>
                  </fieldset>
                </div>
              ))}

              {/* Botão de adicionar nova parte */}
              <Button
                icon={PlusIcon}
                handleClick={handleAddParte}
                className="icon add"
                title="Adicionar nova parte"
              />
            </div>


            <div className="columns">
              <fieldset className="bigger">
                <Label id="areaDireito">Área do Direito</Label>
                <Select 
                  id="areaDireito" 
                  value={novoProcesso.responsavel}
                  handleChange={handleChange}>
                    className={
                    formError && !novoProcesso.area ? "error" : ""
                  }
                  <option value="">Selecione a área do Direito</option>
                  <option value="Constitucional">Constitucional</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Tributário">Tributário</option>
                  <option value="Penal">Penal</option>
                  <option value="Processual Penal">Processual Penal</option>
                  <option value="Processual Civil">Processual Civil</option>
                  <option value="Civil">Civil</option>
                  <option value="Empresarial">Empresarial</option>
                  <option value="Trabalhista">Trabalhista</option>
                  <option value="Previdenciário">Previdenciário</option>
                  <option value="Consumidor">Consumidor</option>
                  <option value="Imobiliário">Imobiliário</option>
                  <option value="Família">Família</option>
                  <option value="Sucessões">Sucessões</option>
                  <option value="Ambiental">Ambiental</option>
                  <option value="Digital">Digital</option>
                  <option value="Tecnologia e Proteção de Dados">Tecnologia e Proteção de Dados</option>
                  <option value="Internacional">Internacional</option>
                  <option value="Econômico">Econômico</option>
                  <option value="Desportivo">Desportivo</option>
                  <option value="Marítimo">Marítimo</option>
                  <option value="Minerário">Minerário</option>
                  <option value="Médico e da Saúde">Médico e da Saúde</option>

                </Select>
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