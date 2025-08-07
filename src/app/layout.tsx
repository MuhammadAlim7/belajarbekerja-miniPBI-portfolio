import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SectionRefProvider } from "./hooks/SectionRefContext";

const figtree = Figtree({
   variable: "--font-figtree",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Muhammad Nur Alim",
   description:
      "Portofolio Muhammad Nur Alim – Web Developer, Programmer, dan Tech Enthusiast.",
   keywords: [
      "Muhammad Nur Alim",
      "Web Developer",
      "Portfolio",
      "Next.js",
      "React",
      "Frontend",
      "Full Stack",
   ],
   other: {
      "google-site-verification": " ",
   },
   robots: {
      index: true,
      follow: true,
   },
   authors: [
      { name: "Muhammad Nur Alim", url: "https://muhammadalim7.github.io/" },
   ],
   creator: "Muhammad Nur Alim",
   icons: {
      icon: "/logo.svg",
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${figtree.variable} antialiased`}>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <SectionRefProvider>{children}</SectionRefProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
