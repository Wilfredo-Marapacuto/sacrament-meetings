import type { Metadata } from "next";
import { Merriweather, Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description:
    "Plan, manage, review, and print current and past sacrament meeting programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${openSans.variable} min-h-screen bg-slate-50 text-slate-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />

          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </body>
    </html>
  );
}