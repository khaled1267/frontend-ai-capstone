import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlyRank FE-03",
  description: "Frontend AI engineering capstone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
