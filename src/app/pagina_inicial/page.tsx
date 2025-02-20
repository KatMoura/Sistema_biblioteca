'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Card from "../components/Card";
import Botao from "../components/Botao";

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

export default function Home() {
    const [emprestimosRecentes, setEmprestimosRecentes] = useState<any[]>([]);

    useEffect(() => {
        // Buscar dados do localStorage
        const emprestimos = JSON.parse(localStorage.getItem('emprestimos') || '[]');
        const livros = JSON.parse(localStorage.getItem('livros') || '[]');
        const clientes = JSON.parse(localStorage.getItem('users') || '[]');

        // Combinar os dados e pegar os 5 empréstimos mais recentes
        const emprestimosComDetalhes = emprestimos
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
            .sort((a: any, b: any) => new Date(b.dataEmprestimo).getTime() - new Date(a.dataEmprestimo).getTime())
            .slice(0, 5);

        setEmprestimosRecentes(emprestimosComDetalhes);
    }, []);

    return (
        <>
            <Menu />
            <div className="flex justify-between items-center space-y-2 mx-6">
                <h1 className='text-3xl font-bold text-navy-900 my-8 mx-5'>Dashboard </h1>
                <Botao />
            </div>
            <Card />
            <div className="flex justify-center items-center m-9">
                <div className="bg-white rounded-lg shadow p-6 w-[49%] mr-6">
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">Empréstimos Recentes</h3>
                    <div className="space-y-4">
                        {emprestimosRecentes.map((emp) => (
                            <div key={emp.id} className="border-b pb-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-navy-900">{emp.livroTitulo}</p>
                                        <p className="text-sm text-gray-600">Cliente: {emp.clienteNome}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{emp.dataFormatada}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 w-[49%]">
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">Devoluções Pendentes</h3>
                </div>
            </div>
        </>
    );
}