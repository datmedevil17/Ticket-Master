import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { register } from 'swiper/element';
import { ethers } from 'ethers';

export default function FormDialog({state}) {
    const {contract} = state
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [cost, setCost] = React.useState('');
  const [maxTickets, setMaxTickets] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether')
  }

  const handleClose = () => {
    setOpen(false);
  };

  const registerEvent=async(e)=>{
    e.preventDefault()
    const tx = await contract.list(name , tokens(cost),maxTickets, date,time,location)
    await tx.wait()
    console.log(tx)
    handleClose()


  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add an Event
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}>
            <form onSubmit={registerEvent}>
        <DialogTitle>Register Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide details for the event !!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="cost"
            name="cost"
            label="Cost"
            type="number"
            fullWidth
            variant="standard"
            onChange ={(e)=>setCost(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="maxTickets"
            name="maxTickets"
            label="MaxTickets"
            type="number"
            fullWidth
            variant="standard"
            onChange ={(e)=>setMaxTickets(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="date"
            name="date"
            label=""
            type="date"
            fullWidth
            variant="standard"
            onChange ={(e)=>setDate(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="time"
            name="time"
            label=""
            type="time"
            fullWidth
            variant="standard"
            onChange ={(e)=>setTime(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="location"
            name="location"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            onChange ={(e)=>setLocation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Register</Button>
        </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
