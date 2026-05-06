"use client";

import { FiCheckSquare, FiFile } from "react-icons/fi";
import { CustomerProps } from "@/types/customer.type";
import { TicketProps } from "@/types/ticket.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

type TicketPropsItem = {
  ticket: TicketProps;
  customer: CustomerProps | null;
};

export function TicketItem({ ticket, customer }: TicketPropsItem) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({ ticket, customer });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 hover:bg-gray-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span
            className={`${ticket.status === "open" ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded text-white font-bold`}
          >
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="cursor-pointer" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#131313" />
          </button>
          <button className="cursor-pointer" onClick={handleOpenModal}>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
