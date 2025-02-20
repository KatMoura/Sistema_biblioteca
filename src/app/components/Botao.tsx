"use client"; // Necessário no Next.js 13+

import Link from 'next/link';

export default function Button() {

  return (

    <div className='m-4 flex justify-center space-x-6'>
      <div>
        <Link href="/newBook">
          <button className=" bg-sky-950 h-[50px] hover:bg-background text-white hover:text-slate-600 font-bold py-2 px-6 mr-5 rounded">
            Cadastrar Livro
          </button>
        </Link>
      </div>
      <div>
        <Link href="/newClient">
          <button className=" bg-sky-950 h-[50px] hover:bg-background text-white hover:text-slate-600 font-bold py-2 px-6 mr-0 rounded">
            Cadastrar Usuário
          </button>
        </Link>
      </div>
    </div>
  );
}
