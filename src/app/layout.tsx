import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { MyContextProvider } from './context/MyContext';
import 'bootstrap/dist/css/bootstrap.css';
const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paging All Airports",
  description: "Page your airport now!",
};

// Parent component which wraps entire app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MyContextProvider>
            <body className={lexend.className}>
              {children}
            </body>
      </MyContextProvider>
    </html>
  );
}
