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
    <html lang="en">
      <body>
        <Sidebar />
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
