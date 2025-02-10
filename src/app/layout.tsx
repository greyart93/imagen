import { ThemeProvider } from "@/components/theme-provider"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Provider from "./provider";
import { Toaster } from "@/components/ui/toaster";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imagen",
  description: "Generate Image from text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative max-w-7xl mx-auto`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            <Provider>
            <Header />
            {children} 
            <Toaster />
            </Provider>
          </ThemeProvider>
      </body>
    </html>
  );
}
