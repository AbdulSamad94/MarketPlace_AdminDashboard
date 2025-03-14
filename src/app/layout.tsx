import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Next.js 15 Admin Dashboard with Sanity CMS integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col md:flex-row bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 w-full">{children}</main>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
