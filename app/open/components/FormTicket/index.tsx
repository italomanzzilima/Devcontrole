"use client";

import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";

const schema = z.object({
  name: z.string().min(3, "o campo nome é obrigatorio"),
  description: z.string().min(3, "o campo descrição é obrigatorio"),
});

type formData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CustomerDataInfo;
}

export function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: formData) {
    await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      className="bg-slate-200 mt-6 px-4 py-6 rounded border-2 border-slate-300"
      onSubmit={handleSubmit(handleRegisterTicket)}
      method="POST"
    >
      <label htmlFor="name" className="mb-1 font-medium text-lg">
        Nome do chamado
      </label>
      <Input
        id="name"
        name="name"
        placeholder="Digite o nome do chamado..."
        type="text"
        error={errors?.name?.message}
        register={register}
      />
      <label htmlFor="description" className="mb-1 font-medium text-lg">
        Descrição do chamado
      </label>
      <textarea
        id="description"
        className="w-full border-2 rounded-md resize-none mb-2 px-2"
        placeholder="Digite a descrição do chamado..."
        {...register("description")}
      ></textarea>
      {errors?.description?.message && (
        <p className="text-red-500 my-1">{errors?.description?.message}</p>
      )}
      <button
        type="submit"
        className="bg-blue-500 w-full gap-3 px-2 h-11 text-white font-bold rounded-md cursor-pointer hover:bg-blue-400 transition 2s"
      >
        Cadastrar
      </button>
    </form>
  );
}
