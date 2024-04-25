"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import adminPic from "../../components/greeting/adminpic.png";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Bio() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 20,
          width: "100%",
        }}
      >
        <Card sx={{ width: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={adminPic.src}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Mentee 1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mentee Descriptions
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" onClick={handleOpen}>
              Learn More
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ width: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={adminPic.src}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Mentee 1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mentee Descriptions
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" onClick={handleOpen}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
