import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Login to the admin panel",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  ); // No sidebar, header, or extra HTML structure
}
