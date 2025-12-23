import Link from "next/link";

export default function SideBarItem({ icon, label, path, active }: any) {
  return (
    <Link
      href={path}
      className={`flex items-center p-2 my-2 ${
        active ? "text-white font-semibold" : "text-gray-300"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="flex-1">{label}</span>
    </Link>
  );
}
