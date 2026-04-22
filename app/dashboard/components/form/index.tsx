"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(3, "O campo nome é obrigatorio"),
  email: z.email("Digite um email valido").min(1, "O Email é obrigatorio!"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      error: "O numero de telefone deve estar (DD) XXXXXXXXX",
    },
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });

    router.refresh();
    router.replace("/dashboard/customer");
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo:</label>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Digite seu nome completo"
        error={errors.name?.message}
        register={register}
      />

      <section className="flex flex-col sm:flex-row gap-2">
        <div className="w-full">
          <label className="mb-1 text-lg font-medium">Telefone:</label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Exemplo: (DD) XXXXXXXXX"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="w-full">
          <label className="mb-1 text-lg font-medium">Email:</label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium">Endereço completo:</label>
      <Input
        type="text"
        name="address"
        id="address"
        placeholder="Digite seu endereço"
        error={errors.address?.message}
        register={register}
      />

      <button
        type="submit"
        className="bg-blue-500 my-4 px-2 h-11 rounded-lg text-white font-bold cursor-pointer hover:bg-blue-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  );
}
