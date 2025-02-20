


import Link from "next/link";
import Image from "next/image";

export default function Login() {
    return (
        <>

            
            <div className="container flex items-center justify-items-center gap-6">
                 <div className="flex absolute top-0 left-0 z-10 text-black w-[49%] h-[490px] rounded-lg shadow p-6 mr-6">
                    <h1>Seja bem-vindo!</h1>
                </div>
            </div>
            <div className="block items-center justify-center h-screen">
                <Image
                    className="w-full h-full object-cover brightness-50 filter blur-sm"
                    src="/1036.jpg" alt=""
                    layout="fill"
                />
            </div>

        </>
    );
}