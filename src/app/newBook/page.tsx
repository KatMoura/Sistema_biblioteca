'use client';
import React, { useRef, useState } from 'react';
import { BookOpen, Upload } from 'lucide-react';
import Menu from '../components/Menu';
import Link from 'next/link';

// Define a interface para o formulário do livro
interface BookForm {
    titulo: string;
    autor: string;
    ano: string;
    editora: string;
    descricao: string;
    idioma: string;
    categoria: string;
}

// Componente principal para adicionar um novo livro
export default function NewBook() {
    const inserirImagem = useRef<HTMLInputElement>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<BookForm>({
        titulo: '',
        autor: '',
        ano: '',
        editora: '',
        descricao: '',
        idioma: '',
        categoria: ''
    });

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Garantir que temos um array
            let livrosAtuais = [];
            const livrosString = localStorage.getItem('livros');
            
            if (livrosString) {
                const parsed = JSON.parse(livrosString);
                livrosAtuais = Array.isArray(parsed) ? parsed : [];
            }

            // Criar novo livro
            const novoLivro = {
                id: livrosAtuais.length + 1,
                titulo: formData.titulo,
                autor: formData.autor,
                ano: formData.ano,
                editora: formData.editora,
                descricao: formData.descricao,
                idioma: formData.idioma,
                categoria: formData.categoria,
                coverUrl: coverPreview
            };

            // Adicionar ao array e salvar
            livrosAtuais.push(novoLivro);
            localStorage.setItem('livros', JSON.stringify(livrosAtuais));

            alert('Livro salvo com sucesso!');
            window.location.href = '/pagina_inicial';
        } catch (error) {
            console.error('Erro ao salvar livro:', error);
            alert('Erro ao salvar livro. Por favor, tente novamente.');
        }
    };

    // Função para abrir o seletor de arquivos
    const handleCoverClick = () => {
        inserirImagem.current?.click();
    };

    // Função para lidar com a mudança de arquivo
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Menu />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-navy-900 mb-8">Cadastrar Livro</h1>
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow p-6">
                        {/* Coluna da Esquerda - Capa do Livro */}
                        <div className="flex flex-col items-center">
                            <div 
                                className="w-80 h-[400px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                                onClick={handleCoverClick}
                            >
                                {coverPreview ? (
                                    <img 
                                        src={coverPreview} 
                                        alt="Capa do Livro" 
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                        <Upload className="w-12 h-12 text-gray-400" />
                                        <p className="text-gray-500 text-center mt-2">Clique para adicionar a capa do livro</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={inserirImagem}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Coluna da Direita - Formulário */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input
                                        type="text"
                                        name="titulo"
                                        value={formData.titulo}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                                    <input
                                        type="text"
                                        name="autor"
                                        value={formData.autor}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                                    <input
                                        type="date"
                                        name="ano"
                                        value={formData.ano}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Editora</label>
                                    <input
                                        type="text"
                                        name="editora"
                                        value={formData.editora}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                    <textarea
                                        name="descricao"
                                        value={formData.descricao}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                                    <select
                                        name="idioma"
                                        value={formData.idioma}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Selecione um idioma</option>
                                        <option value="pt">Português</option>
                                        <option value="en">Inglês</option>
                                        <option value="es">Espanhol</option>
                                        <option value="fr">Francês</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                    <select
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Selecione uma categoria</option>
                                        <option value="ficcao">Ficção Científica</option>
                                        <option value="aventura">Ação/Aventura</option>
                                        <option value="romance">Romance/Drama</option>
                                        <option value="misterio">Mistério/Suspense</option>
                                        <option value="biografia">Biografia</option>
                                        <option value="terror">Terror</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 space-x-4">
                        <Link href="/">
                            <button 
                                type="button" 
                                className="px-6 py-2 border-2 border-gray-700 text-gray-700 font-bold rounded-md hover:bg-gray-100 transition-colors"
                            >
                                Voltar
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-sky-950 text-white font-bold rounded-md hover:bg-black transition-colors"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

