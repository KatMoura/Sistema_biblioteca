import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function Menu() {
    return (
        <menu className="flex justify-between items-center bg-sky-950 h-[100px] p-4 mb-50 ">
            <div className='flex justify-between items-center w-full mr-10'>
                <div className='flex items-center mr-0'>
                    <img src="/logo.svg" alt="Logo"
                        className='dark:invert'
                        width={70}
                        height={38} />
                    <div className='text-white'>Biblio<b className='text-gray-200'>Theca</b></div>
                </div>
                <Link href={'/pagina_inicial'}>
                    <h1>Home</h1>
                </Link>
                <div>
                    <Link href="/emprestimos">
                        <h1>Empréstimos</h1>
                    </Link>
                </div>

                <div>
                    <Link href="/devolucoes">
                        <h1>Devoluções</h1>
                    </Link>
                </div>
                <div>
                    <Link href="/relatorios">
                        <h1>Relatórios</h1>
                    </Link>
                </div>
                <div className='flex text-red-500'>
                    <Link href='/login'>
                        <LogOut></LogOut></Link>
                </div>
            </div>

        </menu>


    )
}