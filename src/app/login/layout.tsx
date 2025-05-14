import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login Page",
  description: "Login to the admin panel",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-blue-50 to-blue-100">
        <main>{children}</main>
      </body>
    </html>
  );
}
