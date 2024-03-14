import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { app } from "./meta.mjs";
export const metadata: Metadata = {
  title: app.title,
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
