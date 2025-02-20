'use client';
import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import { BookOpen, User, Calendar, CheckCircle } from 'lucide-react';

interface Emprestimo {
    id: number;
    livroId: number;
    clienteId: number;
    dataEmprestimo: string;
    dataDevolucao?: string;
}

interface Livro {
    id: number;
    titulo: string;
}

interface Cliente {
    id: number;
    nome: string;
}

export default function Devolucoes() {
    const [emprestimos, setEmprestimos] = useState<any[]>([]);

    useEffect(() => {
        carregarEmprestimos();
    }, []);

    const carregarEmprestimos = () => {
        try {
            const emprestimosData = JSON.parse(localStorage.getItem('emprestimos') || '[]');
            const livros = JSON.parse(localStorage.getItem('livros') || '[]');
            const clientes = JSON.parse(localStorage.getItem('users') || '[]');

            // Filtrar apenas empréstimos ativos (sem data de devolução)
            const emprestimosAtivos = emprestimosData
                .filter((emp: Emprestimo) => !emp.dataDevolucao)
                .map((emp: Emprestimo) => {
                    const livro = livros.find((l: Livro) => l.id === emp.livroId);
                    const cliente = clientes.find((c: Cliente) => c.id === emp.clienteId);
                    return {
                        ...emp,
                        livroTitulo: livro?.titulo || 'Livro não encontrado',
                        clienteNome: cliente?.nome || 'Cliente não encontrado',
                        dataFormatada: new Date(emp.dataEmprestimo).toLocaleDateString('pt-BR')
                    };
                })
                .sort((a: any, b: any) => new Date(a.dataEmprestimo).getTime() - new Date(b.dataEmprestimo).getTime());

            setEmprestimos(emprestimosAtivos);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            setEmprestimos([]);
        }
    };

    const realizarDevolucao = (emprestimoId: number) => {
        try {
            const emprestimosData = JSON.parse(localStorage.getItem('emprestimos') || '[]');
            const emprestimosAtualizados = emprestimosData.map((emp: Emprestimo) => {
                if (emp.id === emprestimoId) {
                    return {
                        ...emp,
                        dataDevolucao: new Date().toISOString()
                    };
                }
                return emp;
            });

            localStorage.setItem('emprestimos', JSON.stringify(emprestimosAtualizados));
            alert('Devolução realizada com sucesso!');
            carregarEmprestimos();
        } catch (error) {
            console.error('Erro ao realizar devolução:', error);
            alert('Erro ao realizar devolução. Tente novamente.');
        }
    };

    return (
        <>
            <Menu />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-navy-900 mb-6">Devoluções Pendentes</h1>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Livro
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Data Empréstimo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {emprestimos.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                            Não há devoluções pendentes
                                        </td>
                                    </tr>
                                ) : (
                                    emprestimos.map((emp) => (
                                        <tr key={emp.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {emp.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {emp.livroTitulo}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <User className="h-5 w-5 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-900">
                                                        {emp.clienteNome}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {emp.dataFormatada}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => realizarDevolucao(emp.id)}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Devolver
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}