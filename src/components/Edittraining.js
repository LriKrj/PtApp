import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function Edittraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
      
  });

  const handleClickOpen = () => {
    setTraining({
        date: props.training.date,
        duration: props.training.duration,
        activity: props.training.activity
    })
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const updateTraining= () => {
    props.updateTraining(training, props.training.links[0].href);
    handleClickClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            label="Date"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            label="Duration"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            label="Activity"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={updateTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

