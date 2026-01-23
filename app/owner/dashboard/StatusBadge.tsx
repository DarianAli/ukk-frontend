type Props = {
  status: "active" | "cancel" | "finish"
}

export default function StatusBadge({ status }: Props) {
  const color =
    status === "active"
      ? "bg-green-100 text-green-700"
      : status === "finish"
      ? "bg-gray-100 text-gray-700"
      : "bg-red-100 text-red-700"

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      {status}
    </span>
  )
}
