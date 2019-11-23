import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMediaPredicate } from "react-media-hook";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "10px"
  }
}));

export default function DeleteMutipleBtn(props) {
  const classes = useStyles();
  const numberOfPlans = props.numberOfPlans;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const isBiggerThan420 = useMediaPredicate("(max-width: 420px)");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        type="button"
        onClick={handleOpen}
        color="secondary"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div
          style={{
            top: 160,
            left: isBiggerThan420 ? 5 : "calc(50% - 210px)",
            width: isBiggerThan420 ? "calc(100% - 30px)" : 400
          }}
          className={classes.paper}
        >
          <h2 id="simple-modal-title">Delete</h2>
          <p id="simple-modal-description">
            Are you sure to delete the {numberOfPlans} plans. 
          </p>
        </div>
      </Modal>
    </div>
  );
}
