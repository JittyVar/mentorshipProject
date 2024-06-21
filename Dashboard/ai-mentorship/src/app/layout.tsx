"use client";

require("dotenv").config();
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import MiniDrawer from "@/components/sideNav/sideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Box>
          <Container maxWidth="xl">
            <Provider store={store}>
              <MiniDrawer>{children}</MiniDrawer>
            </Provider>
          </Container>
        </Box>
      </body>
    </html>
  );
}
