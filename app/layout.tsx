import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Depizza Town - Menu | Gulshan-e-Iqbal, Karachi",
  description: "Digital menu for Depizza Town restaurant. Best pizzas, burgers, and more in Karachi!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
