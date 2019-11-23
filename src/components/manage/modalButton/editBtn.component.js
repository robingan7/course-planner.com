import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { useMediaPredicate } from "react-media-hook";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "10px"
  }
}));

export default function EditBtn(props) {
  const classes = useStyles();
  const planName = props.planName;
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
    <React.Fragment>
      <IconButton
        type="button"
        onClick={handleOpen}
        edge="end"
        aria-label="comments"
      >
        <EditIcon />
      </IconButton>
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
          <h2 id="simple-modal-title">Edit {planName}</h2>
          <p id="simple-modal-description">Edit {planName}</p>
        </div>
      </Modal>
    </React.Fragment>
  );
}
