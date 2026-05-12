"use client";

import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export function ButtonRefresh() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.refresh()}
      className="bg-green-600 cursor-pointer px-3 py-1 rounded hover:bg-green-500"
    >
      <FiRefreshCcw size={24} color="#FFF" />
    </button>
  );
}
