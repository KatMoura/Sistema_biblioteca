import Image from './Imagem';

export default function Menu() {
    return (
        <menu className="flex justify-between items-center bg-sky-950 h-[100px] p-4 mb-50">
            <Image />
            <div>Livros</div>
            <select style={{ width: '125px' }}>
                <option value="emprestimos">Empréstimos</option>
                <option value="concluidos">Concluídos</option>
                <option value="emprestimos">Ativos</option>
                <option value="multas">Empréstimos com multas</option>
            </select>
            <div className="devolucoes">Devoluções</div>
            <select style={{ width: '105px' }}>
                <option value="relatorios">Relatórios</option>
                <option value="livros_disp">Livros disponíveis</option>
                <option value="emprestados">Livros Emprestados</option>
                <option value="user">Usuários Cadastrados</option>
                <option value="user_books">Usuários com livros emprestados</option>
            </select>
        </menu>
    )
}