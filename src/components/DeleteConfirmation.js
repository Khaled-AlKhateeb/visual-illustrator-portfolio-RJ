import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="delete-confirmation" >
      <button className="delete-btn" onClick={handleClickOpen}>
        <DeleteIcon sx={{ fontSize: 40 }} />
      </button>
      <Dialog
        className="delete-dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"ARE YOU SURE?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={props.delete} autoFocus>delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}