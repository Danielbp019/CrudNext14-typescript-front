import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creado con Next 14 y typescript",
  description: "CRUD front end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
