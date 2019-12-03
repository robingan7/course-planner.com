import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
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

export default function EditBtn(props) {
  const classes = useStyles();
  const { id, planName, appointment,appointFunc, resources} = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const [isAutoAdjust, setIsAutoAdjust] = React.useState(true);
  const [error, setError] = React.useState("");
  const [startDate, setStartDate] = React.useState(appointment.startDate.split("T")[0]);
  const [endDate, setEndDate] = React.useState(appointment.endDate.split("T")[0]);
  const [title, setTitle] = React.useState(appointment.title);
  const [period, setPeriod] = React.useState(appointment.period);
  const [notes, setNotes] = React.useState(appointment.notes);

  const handleChangeSwitch = name => event => {
    setIsAutoAdjust(event.target.checked);
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

    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'period':
        setPeriod(value);
        break;
      case 'notes':
        setNotes(value);
        break;
      default:
        console.log('invalid name');
    }
  }

  const handleChange2 = (name, value) => {
    switch (name) {
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      default:
        console.log('invalid name in handleChange2');
    }
  };

  const isFullFilled = () => {
    return startDate != '' && endDate != '' && title != '' && period != '';
  }

  const editAppoint = () => {
    if (!isFullFilled()) {
      setError("Please fill in all the fields");
    } else if (endDate < startDate) {
      setError("Start date should be smaller or equal to end date");
    } else {
      appointFunc({
        note: notes,
        title: title,
        endDate: endDate,
        period: period,
        startDate: startDate,
        isAutoAdjust: isAutoAdjust
      }, "edit", id);
    }
  }

  let array = [];
  resources.map(resource => {
    if (resource.fieldName == "period") {
      array = resource.instances;
    }
  });

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
        <div className="modalBody">
          <Grid item>
            <CancelIcon className="closeIcon" onClick={handleClose} />
          </Grid>
          <h2 id="simple-modal-title" className="modalTitle">
            Edit <span className="planName">{planName}</span>
          </h2>
          <h3 className="modalError">{error}</h3>
          <form className={classes.form}>
            <p className="modalP">Start Date</p>
            <DayPickerInput
              value={startDate}
              className={classes.modalInput}
              onDayChange={day => handleChange2("startDate", day)}
            />

            <p className="modalP">End Date</p>
            <DayPickerInput
              value={endDate}
              className={classes.modalInput}
              onDayChange={day => handleChange2("endDate", day)}
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
                  value={title}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <FormControl className={classes.modalInput}>
              <InputLabel id="demo-simple-select-label">Period</InputLabel>
              <Select native name="period" onChange={handleChange} value={period}>
                <option value=""/>
                {array.map(instance => {
                  return <option key={instance.id} value={instance.id}>{instance.text}</option>;
                })}
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
              value={notes}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isAutoAdjust}
                  color="primary"
                  onChange={handleChangeSwitch()}
                />
              }
              label="Auto adjust"
              className={classes.modalInput}
            />

            <Button
              variant="contained"
              color="primary"
              className={classes.modalBtn}
              startIcon={<EditIcon />}
              onClick={editAppoint}
            >
              Edit
            </Button>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
}
