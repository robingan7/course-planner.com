import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
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
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "10px"
  },
  modalInput: {
    width: 209,
    margin:0,
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

export default function DeleteMutipleBtn(props) {
  const classes = useStyles();
  const numberOfPlans = props.numberOfPlans;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const isBiggerThan420 = useMediaPredicate("(max-width: 420px)");

  const [state, setState] = React.useState({
    isAutoAdjust: true
  });

  const handleChange = name => event => {
    setState({[name]: event.target.checked });
  };

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
            top: isBiggerThan420 ? 10 : 99,
            left: isBiggerThan420 ? 5 : "calc(50% - 210px)",
            width: isBiggerThan420 ? "calc(100% - 30px)" : 400,
            height: isBiggerThan420 ? "calc(100% - 40px)" : "auto"
          }}
          className={classes.paper}
        >
          <Grid item>
            <CancelIcon className="closeIcon" onClick={handleClose} />
          </Grid>
          <h2 id="simple-modal-title" className="modalTitle">
            Delete
          </h2>
          <p className="modalP" id="simple-modal-description">
            Are you sure to delete the {numberOfPlans} plans?
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
    </div>
  );
}
