'use client';
import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Link from 'next/link';

interface Livro {
    id: number;
    titulo: string;
}

interface Cliente {
    id: number;
    nome: string;
}

interface EmprestimoForm {
    id: number;
    livroId: number;
    clienteId: number;
    dataEmprestimo: string;
}

export default function NewEmprestimo() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [formData, setFormData] = useState<EmprestimoForm>({
        id: 0,
        livroId: 0,
        clienteId: 0,
        dataEmprestimo: new Date().toISOString().split('T')[0]
    });

    // Carrega os dados iniciais
    useEffect(() => {
        const loadData = () => {
            try {
                // Carrega e valida os dados dos livros
                const livrosString = localStorage.getItem('livros');
                if (livrosString) {
                    const livrosData = JSON.parse(livrosString);
                    if (Array.isArray(livrosData)) {
                        setLivros(livrosData);
                    }
                }

                // Carrega e valida os dados dos clientes
                const clientesString = localStorage.getItem('users');
                if (clientesString) {
                    const clientesData = JSON.parse(clientesString);
                    if (Array.isArray(clientesData)) {
                        setClientes(clientesData);
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setLivros([]);
                setClientes([]);
            }
        };

        loadData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'livroId' || name === 'clienteId' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const emprestimos = JSON.parse(localStorage.getItem('emprestimos') || '[]');
            const newEmprestimo = {
                ...formData,
                id: emprestimos.length + 1,
                dataEmprestimo: new Date(formData.dataEmprestimo).toISOString()
            };
            
            emprestimos.push(newEmprestimo);
            localStorage.setItem('emprestimos', JSON.stringify(emprestimos));

            alert('Empréstimo registrado com sucesso!');
            window.location.href = '/emprestimos';
        } catch (error) {
            console.error('Erro ao salvar empréstimo:', error);
            alert('Erro ao registrar empréstimo. Tente novamente.');
        }
    };

    // Verifica se há dados carregados
    if (!livros.length || !clientes.length) {
        return (
            <>
                <Menu />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-navy-900 mb-4">Novo Empréstimo</h1>
                    <p className="text-red-600">
                        Não há livros ou clientes cadastrados. Por favor, cadastre-os primeiro.
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <Menu />
            <div className="container mx-auto px-4 max-w-2xl py-8">
                <h1 className="text-3xl font-bold text-navy-900 mb-8">Novo Empréstimo</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="livroId">
                            Livro
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="livroId"
                            name="livroId"
                            value={formData.livroId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um livro</option>
                            {livros.map(livro => (
                                <option key={livro.id} value={livro.id}>
                                    {livro.titulo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clienteId">
                            Cliente
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="clienteId"
                            name="clienteId"
                            value={formData.clienteId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataEmprestimo">
                            Data do Empréstimo
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dataEmprestimo"
                            type="date"
                            name="dataEmprestimo"
                            value={formData.dataEmprestimo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Link href="/emprestimos">
                            <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Voltar
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="bg-sky-950 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Registrar Empréstimo
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}