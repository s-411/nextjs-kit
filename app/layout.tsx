import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "75 Hard — Chasing Optimum Redesign",
  description:
    "Design canvas for the Chasing Optimum redesign of the 75 Hard app — 41 iPhone artboards exported from Claude Design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
