import { TicketProps } from "@/types/ticket.type";
import { TicketItem } from "../ticketItem";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function TicketTable() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets: TicketProps[] = await prisma.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "open",
    },
    include: {
      customer: true,
    },
  });

  return (
    <>
      <table className="min-w-full my-2 bg-slate-300">
        <thead>
          <tr className="border-b-2 border-b-slate-400">
            <th className="font-medium text-left uppercase pl-1">Cliente</th>
            <th className="font-medium text-left uppercase">Data cadastro</th>
            <th className="font-medium text-left uppercase">Status</th>
            <th className="font-medium text-left uppercase">#</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              customer={ticket.customer}
            />
          ))}
        </tbody>
      </table>
      {tickets.length === 0 && (
        <h1 className="px-2 text-gray-400">
          Nenhum ticket aberto foi encontrato
        </h1>
      )}
    </>
  );
}
