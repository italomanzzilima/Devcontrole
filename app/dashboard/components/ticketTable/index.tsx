import { TicketItem } from "../ticketItem";

export function TicketTable() {
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
          <TicketItem />
          <TicketItem />
          <TicketItem />
          <TicketItem />
        </tbody>
      </table>
    </>
  );
}
