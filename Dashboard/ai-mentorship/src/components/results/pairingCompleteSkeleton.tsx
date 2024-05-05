import { Avatar, Grid, Grow, Paper } from "@mui/material";
const PairingCompleteSkeleton = () => {
  return (
    <Paper>
      <Grid container spacing={2} sx={{ widht: "100%", height: "300px" }}>
        <Grow in={true}>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </Grid>
        </Grow>
        <Grow
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 1000 } : {})}
        >
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </Grid>
        </Grow>
      </Grid>
    </Paper>
  );
};

export default PairingCompleteSkeleton;
