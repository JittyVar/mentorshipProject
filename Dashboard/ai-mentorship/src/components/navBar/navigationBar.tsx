import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const pages = ["Home", "Match"];

function ResponsiveAppBar() {
  const router = useRouter();

  const handleTabClick = (page: string) => {
    let url: string;

    switch (page) {
      case "Home":
        url = "/";
        break;
      case "Match":
        url = "/match";
        break;
      default:
        return;
    }

    router.push(url);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1E1F42",
        "& .MuiButton-root": {
          backgroundColor: "white",
          marginRight: "10px",
          width: "100px",
          color: "#1E1F42",
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleTabClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
