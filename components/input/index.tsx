"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}
export function Input({
  name,
  id,
  placeholder,
  register,
  type,
  error,
  rules,
}: InputProps) {
  return (
    <>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(name, rules)}
        className="w-full border-2 rounded-md h-11 px-2"
      />
      {error && <p className="text-red-500 my-1">{error}</p>}
    </>
  );
}
