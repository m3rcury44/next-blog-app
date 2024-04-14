import "./assets/styles/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import Header from '@/widgets/header';
import Footer from "@/entities/footer";
import Providers from '@/shared/providers';

const inter = Inter({ subsets: ["latin"], variable: '--font' });

export const metadata: Metadata = {
  title: "Next.js Blog App",
  description: "Fullstack blog project on the Next.js",
  icons: {
    icon: '/icon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Toaster duration={3000} richColors position="top-right" closeButton offset={80}/>
          <div className="container">
            <Header/>
            <main>
              {children}
            </main>
            <Footer/>
          </div>
        </Providers>
      </body>
    </html>
  );
}
