'use client';
import React, { useState } from 'react';
import { User } from 'lucide-react';
import Menu from '../components/Menu';
import Link from 'next/link';

interface ClientForm {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: string;
    cidade: string;
    estado: string;
}

export default function NewClient() {
    const [formData, setFormData] = useState<ClientForm>({
        id: 0,
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: '',
        cidade: '',
        estado: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Recupera a lista atual de clientes ou inicializa uma lista vazia
        const clients = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Cria o novo cliente com ID incrementado
        const newClient = {
            ...formData,
            id: clients.length + 1,
            dataCadastro: new Date().toISOString()
        };
        
        // Adiciona o novo cliente à lista
        clients.push(newClient);
        
        // Salva a lista atualizada no localStorage
        localStorage.setItem('users', JSON.stringify(clients));

        alert('Cliente cadastrado com sucesso!');
        window.location.href = '/pagina_inicial';
    };

    return (
        <>
            <Menu />
            <h1 className='text-3xl font-bold text-navy-900 my-8 mx-11'>Cadastrar Cliente</h1>
            <div className='container mx-auto px-4 max-w-3xl'>
                <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                                Nome Completo
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='nome'
                                type='text'
                                name='nome'
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                Email
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='email'
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefone'>
                                Telefone
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='telefone'
                                type='tel'
                                name='telefone'
                                value={formData.telefone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        
                    </div>
                    <div className='flex items-center justify-between mt-6'>
                        <Link href="/">
                            <button type="button" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                Voltar
                            </button>
                        </Link>
                        <button
                            type='submit'
                            className='bg-sky-950 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
} 