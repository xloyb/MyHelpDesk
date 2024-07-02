import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiscordKeeper",
  description: "Your reliable companion for Discord servers, ensuring your conversations are always preserved. Create and manage tickets seamlessly within your Discord community, with all chat histories securely archived. Even if you leave the server or it's banned, your conversations remain accessible through a convenient login with your Discord account. Keep your discussions safe with DiscordKeeper.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}