import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Add Product", href: "/products/add" },
];

export function Sidebar() {
  return (
    <div className="w-64 h-auto bg-gray-800 text-white">
      <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="p-4 hover:bg-gray-700">
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
