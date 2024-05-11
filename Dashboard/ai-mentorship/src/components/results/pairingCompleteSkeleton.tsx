import { Avatar, Grid, Grow, Paper, Typography } from "@mui/material";
const PairingCompleteSkeleton = () => {
  return (
    <Paper>
      <Paper
        elevation={3}
        sx={{ height: "40px", padding: 2, backgroundColor: "#F4E6F2" }}
      >
        <Typography>RESULTS</Typography>
      </Paper>
      <Grid
        container
        spacing={2}
        sx={{
          widht: "100%",
          height: "350px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Avatar
                style={{
                  width: "200px",
                  height: "200px",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight={"bold"} fontSize={20}>
                    Mentee
                  </Typography>
                  <Typography fontWeight={"light"}>Name</Typography>
                </div>
              </div>
            </div>
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Avatar
                style={{
                  width: "200px",
                  height: "200px",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight={"bold"} fontSize={20}>
                    Mentor
                  </Typography>
                  <Typography fontWeight={"light"}>Name</Typography>
                </div>
              </div>
            </div>
          </Grid>
        </Grow>
      </Grid>
    </Paper>
  );
};

export default PairingCompleteSkeleton;
