import React from 'react';
import { BookOpen, Users, Clock, AlertCircle } from 'lucide-react';

export default function Card(props: any) {
    const icones = [
        { name: 'Livros', value: '5', icon: BookOpen, color: 'bg-green-100 text-green-600' },
        { name: 'Usuários Ativos', value: '182', icon: Users, color: 'bg-blue-100 text-blue-600' },
        { name: 'Empréstimos Ativos', value: '34', icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
        { name: 'Atrasos', value: '8', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
    ]

    return (
        <div>
            <div className='grid grid-cols-2 m-10 md:grid-cols-2 lg:grid-cols-4 gap-6 w-30 mt-0 ' >
                {icones.map((icon) => (
                    <div key={icon.name} className='bg-white rounded-lg shadow w-30 p-6 '>
                        <div className={`p-3 rounded-full w-12 ${icon.color}`}>
                            <icon.icon className='w-6 h-6' />
                        </div>
                        <div>
                            <h3 className='text-sm font-medium text-gray-500'>{icon.name}</h3>
                            <p className="text-2xl font-semibold text-navy-900">{icon.value}</p>
                        </div>
                    </div>
                ))}
                {props.children}
            </div>
        </div>
    )
};