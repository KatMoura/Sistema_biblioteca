'use client';
import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Link from 'next/link';
import { BookOpen, User, Calendar } from 'lucide-react';

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

export default function Emprestimos() {
    const [emprestimos, setEmprestimos] = useState<any[]>([]);

    useEffect(() => {
        // Buscar dados do localStorage
        const emprestimosData = JSON.parse(localStorage.getItem('emprestimos') || '[]');
        const livros = JSON.parse(localStorage.getItem('livros') || '[]');
        const clientes = JSON.parse(localStorage.getItem('users') || '[]');

        // Combinar os dados de empréstimos com livros e clientes
        const emprestimosComDetalhes = emprestimosData
            .map((emp: Emprestimo) => {
                const livro = livros.find((l: Livro) => l.id === emp.livroId);
                const cliente = clientes.find((c: Cliente) => c.id === emp.clienteId);
                return {
                    ...emp,
                    livroTitulo: livro?.titulo || 'Livro não encontrado',
                    clienteNome: cliente?.nome || 'Cliente não encontrado',
                    dataFormatada: new Date(emp.dataEmprestimo).toLocaleDateString('pt-BR'),
                    dataDevolucaoFormatada: emp.dataDevolucao 
                        ? new Date(emp.dataDevolucao).toLocaleDateString('pt-BR')
                        : 'Pendente'
                };
            })
            .sort((a: any, b: any) => new Date(b.dataEmprestimo).getTime() - new Date(a.dataEmprestimo).getTime());

        setEmprestimos(emprestimosComDetalhes);
    }, []);

    return (
        <>
            <Menu />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-navy-900">Empréstimos</h1>
                    <Link href="/newEmprestimo">
                        <button className="bg-sky-950 hover:bg-black text-white font-bold py-2 px-4 rounded">
                            Novo Empréstimo
                        </button>
                    </Link>
                </div>

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
                                        Data Devolução
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {emprestimos.map((emp) => (
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {emp.dataDevolucaoFormatada}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${emp.dataDevolucao ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {emp.dataDevolucao ? 'Devolvido' : 'Em Andamento'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}