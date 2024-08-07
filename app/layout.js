import { Inter } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "@/context/UserContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce",
  description: "A mini e-commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
