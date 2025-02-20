import '../style/login.css'
import Link from "next/link";

export default function Login() {
  return (
    <div className='relative w-screen h-screen'>
      <img src="/1036.jpg" alt=""
        className='object-cover w-full h-full brightness-50 absolute'
      />

      <div className='flex items-center justify-center w-40 h-40 absolute'>
        <div className="items- text-black p-6 mr-6">
          <img
            className="dark:invert "
            src='/logo.svg'
            width={100}
            height={200}
            alt="Logo" />
        </div>

        <div className="justify-center items-center">
          <Link href="/pagina_inicial">
            <button className="bg-white hover:bg-blue-300 w-80 h-20 text-black font-bold rounded">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}