import Image from 'next/image';

export default function Imagem() {
    return (

        <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Logo"
            width={70}
            height={38}
        // priority
        />
    )
}