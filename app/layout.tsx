import "./globals.css";
import { Quicksand } from "next/font/google";
import ShoppingContextProvider from "@/context/shoppingContext";

import ClientProviders from "./providers";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ShoppingContextProvider>
        <body className={inter.className + " flex bg-primary-bg-color"}>
          <ClientProviders>{children}</ClientProviders>
        </body>
      </ShoppingContextProvider>
    </html>
  );
}
