'use client';
import React from 'react';

interface BookForm {
    titulo: string;
    autor: string;
    ano: Date;
    editora: string;
    descricao: string;
    idioma: string;
    categoria: string;
}

export default function Cadastrar() {
    const books = []
    const [formData, setFormData] = React.useState<BookForm>({
        titulo: '',
        autor: '',
        ano: new Date(),
        editora: '',
        descricao: '',
        idioma: '',
        categoria: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <form className="p-6 space-y-6">
                <div className="flex gap-6">
                    {/* {Cover Upload} */}
                    <div>
                        <label htmlFor="titulo" className="block text-sm font-medium mb-1">Título</label>
                        <input type="text" id="titulo" name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            required />
                    </div>
                </div>
            </form>
        </>
    )
}
