"use client"; // Necessário no Next.js 13+

import Link from 'next/link';

export default function Button() {

  return (
    <Link href="/newBook">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Cadastrar Livro
      </button>
    </Link>
  );
}
