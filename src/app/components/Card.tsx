'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Card(props: any) {
    const [name, setName] = useState('');
    const [counts, setCounts] = useState({
        livros: 0,
        usuarios: 0,
        emprestimos: 0,
        atrasos: 0
    });

    useEffect(() => {
        const livros = JSON.parse(localStorage.getItem('livros') || '[]').length;
        const usuarios = JSON.parse(localStorage.getItem('users') || '[]').length;
        const emprestimos = JSON.parse(localStorage.getItem('emprestimos') || '[]').length;
        const atrasos = JSON.parse(localStorage.getItem('atrasos') || '[]').length;
        setCounts({ livros, usuarios, emprestimos, atrasos });
    }, []);

    const icones = [
        { name: 'Livros', value: counts.livros, icon: BookOpen, color: 'bg-green-100 text-green-600' },
        { name: 'Usuários Ativos', value: counts.usuarios, icon: Users, color: 'bg-blue-100 text-blue-600' },
        { name: 'Empréstimos Ativos', value: counts.emprestimos, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
        { name: 'Atrasos', value: counts.atrasos, icon: AlertCircle, color: 'bg-red-100 text-red-600' },
    ];

    return (
        <div>
            <div className='grid grid-cols-2 m-10 md:grid-cols-2 lg:grid-cols-4 gap-6 w-30 mt-0'>
                {icones.map((icone) => (
                    <div key={icone.name} className='bg-white rounded-lg shadow w-30 p-6'>
                        <div className={`p-3 rounded-full w-12 ${icone.color}`}>
                            <icone.icon className='w-6 h-6' />
                        </div>
                        <div>
                            <h3 className='text-sm font-medium text-gray-500'>{icone.name}</h3>
                            <p className="text-2xl font-semibold text-navy-900">{icone.value}</p>
                        </div>
                    </div>
                ))}
                {props.children}
            </div>
        </div>
    );
}