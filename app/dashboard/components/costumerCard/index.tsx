"use client";
import { api } from "@/lib/api";
import { CustomerProps } from "@/types/customer.type";
import { useRouter } from "next/navigation";

type CustomerCardProps = {
  customer: CustomerProps;
};

export function CustomerCard({ customer }: CustomerCardProps) {
  const router = useRouter();

  async function handleDeleteCostumer() {
    try {
      await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <span className="font-bold">Nome: </span>
        {customer.name}
      </h2>
      <p>
        <span className="font-bold">Email: </span>
        {customer.email}
      </p>
      <p>
        <span className="font-bold">Telefone: </span>
        {customer.phone}
      </p>
      <button
        className="bg-red-500 px-4 rounded text-white mt-2 self-start"
        onClick={handleDeleteCostumer}
      >
        Deletar
      </button>
    </article>
  );
}
