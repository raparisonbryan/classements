import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import '@ant-design/v5-patch-for-react-19';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Classements",
  description: "Générateur de classements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
