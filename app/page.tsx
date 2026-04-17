import heroImage from "@/public/hero.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="font-medium mb-2 text-2xl">Gerencie sua empresa</h2>
      <h1 className="font-bold mb-8 text-3xl md:text-4xl text-blue-600">
        Atendimentos, Clientes
      </h1>
      <Image
        src={heroImage}
        alt="Imagem hero do dev controle"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
