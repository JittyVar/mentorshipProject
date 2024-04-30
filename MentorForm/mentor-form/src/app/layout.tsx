"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
