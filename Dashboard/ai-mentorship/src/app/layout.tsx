"use client";

require("dotenv").config();
import Box from "@mui/material/Box";
import LabTabs from "@/components/tabs/tabs";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ResponsiveAppBar from "@/components/navBar/navigationBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Box>
          <ResponsiveAppBar />
          <Container maxWidth="xl">
            <Provider store={store}>{children}</Provider>
          </Container>
        </Box>
      </body>
    </html>
  );
}
