import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Clip Alchemist",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="hidden-scrollbar flex flex-col h-screen w-screen select-none">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
