import Menu from "../components/Menu";
import Card from "../components/Card";
import Botao from "../components/Botao";


export default function Home() {
  return (
    <>
      <Menu/>
      <h1 className='text-3xl font-bold text-navy-900 my-8 mx-5'>Dashboard </h1>
      <Botao/>
      <Card/>
    </>
  );
}
