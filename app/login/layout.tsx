import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrator Login | Sacrament Meetings",
  description:
    "Sign in as an administrator to manage sacrament meeting programs.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}