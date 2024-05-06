"use client";

import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface CustomizedSnackbarsProps {
  success: boolean;
}
const CustomizedSnackbars: React.FC<CustomizedSnackbarsProps> = ({
  success,
}) => {
  const [open, setOpen] = React.useState(success);

  React.useEffect(() => {
    setOpen(success);

    // If success is true, set a timeout to set open to false after 6 seconds
    if (success) {
      const timeoutId = setTimeout(() => {
        setOpen(false);
      }, 6000);

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          SUCCESSFULLY PAIRED
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CustomizedSnackbars;
