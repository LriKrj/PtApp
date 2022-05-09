import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function Editcustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
    });
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const updateCustomer = () => {
    props.updateCustomer(customer, props.customer.links[0].href);
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
            name="firstname"
            value={customer.firstname}
            label="First name"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            label="Last name"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            label="Address"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            label="Post code"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            label="City"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            label="Email"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            label="Phone number"
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={updateCustomer}>Save customer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
