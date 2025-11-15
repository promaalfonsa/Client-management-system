import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechService Pro - Client Management System",
  description: "Professional client and service record management system for tech repair teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
