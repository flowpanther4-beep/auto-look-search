import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoPartSnap API",
  description: "API surface for AutoPartSnap"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
