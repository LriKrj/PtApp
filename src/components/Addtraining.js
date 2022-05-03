import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function Addtraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: props.training,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            label="Date"
            fullWidth
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            label="Duration"
            fullWidth
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            label="Activity"
            fullWidth
            onChange={(e) => handleInputChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save training</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
