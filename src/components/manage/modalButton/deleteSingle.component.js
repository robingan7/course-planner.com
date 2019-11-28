import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import { useMediaPredicate } from "react-media-hook";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles(theme => ({
  
  modalInput: {
    width: 209,
    margin: 0,
    marginLeft: "calc(50% - 104.5px)",
    marginBottom: 15
  },
  modalBtn: {
    width: 100,
    marginLeft: "calc(50% - 50px)",
    marginBottom: 15
  },
  form: {
    padding: 0,
    display: "inline"
  }
}));

export default function DeleteSingle(props) {
  const classes = useStyles();
  const planName = props.planName;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const isBiggerThan420 = useMediaPredicate("(max-width: 420px)");

  const [state, setState] = React.useState({
    isAutoAdjust: true
  });

  const handleChange = name => event => {
    setState({ [name]: event.target.checked });
  };

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
        <DeleteIcon />
      </IconButton>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className="modalBody">
          <Grid item>
            <CancelIcon className="closeIcon" onClick={handleClose} />
          </Grid>
          <h2 id="simple-modal-title" className="modalTitle">
            Delete {planName}
          </h2>
          <p className="modalP" id="simple-modal-description">
            Are you sure to delete {planName}?
          </p>
          <form className={classes.form}>
            <FormControlLabel
              control={
                <Switch
                  checked={state.isAutoAdjust}
                  color="primary"
                  value="isAutoAdjust"
                  onChange={handleChange("isAutoAdjust")}
                />
              }
              label="Auto adjust"
              className={classes.modalInput}
            />
            <Grid item className="toolKit" className={classes.modalInput}>
              <ButtonGroup
                variant="contained"
                aria-label="full-width contained primary button group"
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloseIcon />}
                >
                  No
                </Button>
                <Button variant="contained" startIcon={<CheckIcon />}>
                  Yes
                </Button>
              </ButtonGroup>
            </Grid>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
}
