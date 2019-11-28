import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { useMediaPredicate } from "react-media-hook";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import TitleIcon from "@material-ui/icons/Title";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DayPickerInput from "react-day-picker/DayPickerInput";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "react-day-picker/lib/style.css";

const useStyles = makeStyles(theme => ({
  
  modalInput: {
    width: 209,
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

export default function AddBtn() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const isBiggerThan420 = useMediaPredicate("(max-width: 420px)");
  const [state, setState] = React.useState({
    isAutoAdjust: true
  });
  let stateEdit = {
    startDate: "",
    endDate: "",
    title: "",
    period: "",
    notes: ""
  };

  const handleChangeSwitch = name => event => {
    setState({ [name]: event.target.checked });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const {
      target: { name, value }
    } = e;
    stateEdit[name] = value;
  }

  const handleChange2 = (name, value) => {
    stateEdit[name] = value;
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className="modalBody">
          <Grid item className="closeIconGrid">
            <CancelIcon className="closeIcon" onClick={handleClose} />
          </Grid>
          <h2 id="simple-modal-title" className="modalTitle">
            Add
          </h2>

          <h3 className="modalError">Error</h3>

          <form className={classes.form}>
            <p className="modalP">Start Date</p>
            <DayPickerInput
              className={classes.modalInput}
              onDayChange={day => handleChange2("startDate", day.getDay())}
            />

            <p className="modalP">End Date</p>
            <DayPickerInput
              className={classes.modalInput}
              onDayChange={day => handleChange2("endDate", day.getDay())}
            />
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              className={classes.modalInput}
            >
              <Grid item>
                <TitleIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Title"
                  name="title"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <FormControl className={classes.modalInput}>
              <InputLabel id="demo-simple-select-label">Period</InputLabel>
              <Select
                native
                name="period"
                onChange={handleChange}
              >
                <option value="" />
                <option value={"Other"}>Other</option>
                <option value={"Off"}>Off</option>
              </Select>
            </FormControl>
            <TextField
              id="outlined-multiline-static"
              label="Notes"
              multiline
              rows="4"
              defaultValue=""
              className={classes.modalInput}
              margin="normal"
              variant="outlined"
              name="notes"
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.isAutoAdjust}
                  color="primary"
                  value="isAutoAdjust"
                  onChange={handleChangeSwitch("isAutoAdjust")}
                />
              }
              label="Auto adjust"
              className={classes.modalInput}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.modalBtn}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
