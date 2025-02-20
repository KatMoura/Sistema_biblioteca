import React from 'react';
import { FileText, Download } from 'lucide-react';
import Menu from '../components/Menu';

export default function Reports() {
  const reports = [
    { id: 1, name: 'Livros Disponíveis', description: 'Lista de todos os livros disponíveis para empréstimo' },
    { id: 2, name: 'Livros Emprestados', description: 'Lista de livros atualmente emprestados' },
    { id: 3, name: 'Usuários Cadastrados', description: 'Lista completa de usuários do sistema' },
    { id: 4, name: 'Usuários com Livros', description: 'Usuários que possuem livros emprestados' },
    { id: 5, name: 'Empréstimos Ativos', description: 'Empréstimos em andamento' },
    { id: 6, name: 'Empréstimos Concluídos', description: 'Histórico de empréstimos finalizados' },
    { id: 7, name: 'Multas', description: 'Relatório de multas por atraso' },
  ];

  return (

    <div className="space-y-6">
        <Menu />
      <h2 className="text-2xl font-bold text-navy-900">Relatórios</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-navy-100 rounded-full">
                  <FileText className="w-6 h-6 text-navy-900" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-navy-900">{report.name}</h3>
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
              <button className="flex items-center text-sm text-navy-900 hover:text-navy-800">
                <Download className="w-4 h-4 mr-1" />
                Exportar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}