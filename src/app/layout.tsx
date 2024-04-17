import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
  title: "Creado con Next 14 y typescript",
  description: "CRUD Frontend typescript",
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
