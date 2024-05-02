"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
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
        <UserProvider>
          <Provider store={store}>{children}</Provider>
        </UserProvider>
      </body>
    </html>
  );
}
