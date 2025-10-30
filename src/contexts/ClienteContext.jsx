import React, { createContext, useState, useContext } from 'react';

// Criação do Contexto
export const ClienteContext = createContext();

// Criação do Provedor
export const ClienteProvider = ({ children }) => {
    const [clientes, setClientes] = useState([
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

    // Função para adicionar um novo cliente (será usada em Clientes.js)
    const adicionarCliente = (novoCliente) => {
        setClientes((prev) => [...prev, novoCliente]);
    };

    // Função para editar um cliente (será usada em Clientes.js)
    const editarCliente = (index, clienteAtualizado) => {
        setClientes((prev) =>
            prev.map((c, i) => (i === index ? clienteAtualizado : c))
        );
    };

    return (
        <ClienteContext.Provider value={{ clientes, adicionarCliente, editarCliente }}>
            {children}
        </ClienteContext.Provider>
    );
};

// Hook customizado para facilitar o uso do contexto
export const useClientes = () => {
    return useContext(ClienteContext);
};