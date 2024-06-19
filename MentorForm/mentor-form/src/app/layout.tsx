"use client";

import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <UserProvider>{children}</UserProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
