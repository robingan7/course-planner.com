import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DayPickerInput from "react-day-picker/DayPickerInput";
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from "@material-ui/icons/Cancel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "react-day-picker/lib/style.css";
import ListItem from '@material-ui/core/ListItem';
import SelectChapterBtn from './import/selectChapters.component'
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

export default function ImportBtn(props) {
    const classes = useStyles();
    const { appointFunc, resources, textbooks} = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);
    const [openC, setOpenC] = React.useState(false);
    const [isAutoAdjust, setIsAutoAdjust] = React.useState(true);
    const [error, setError] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [period, setPeriod] = React.useState("");
    const [pacing, setPacing] = React.useState("");
    const [textbook, setTextbook] = React.useState("");

    const handleChangeSwitch = name => event => {
        setIsAutoAdjust( event.target.checked );
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
            case 'period':
            setPeriod(value);
            break;
            case 'textbook':
                setTextbook(value);
                break;
            case 'pacing':
                setPacing(value);
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
        default:
            console.log('invalid name in handleChange2');
        }
    };

    const isFullFilled = () => {
        return true;
    }

    const addAppoint = () => {
        if (!isFullFilled()) {
        setError( "Please fill in all the fields" );
        } else {
            /*
        appointFunc({
            note: notes,
            title: title,
            endDate: endDate,
            period: period,
            startDate: startDate,
            isAutoAdjust: isAutoAdjust
        }, "add");*/
        }
    }

    const handleClick = () => {
        setOpenC(!openC);
    };

    let array = [];
    resources.map(resource => {
        if (resource.fieldName == "period") {
            array = resource.instances;
        }
    });

    return (
        <div>
        <Button
            type="button"
            onClick={handleOpen}
            variant="contained"
            color="default"
            startIcon={<PublishIcon />}
        >
            Import
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
                Import
            </h2>

            <h3 className="modalError">{error}</h3>

            <form className={classes.form}>
                <p className="modalP">Start Date</p>
                <DayPickerInput
                className={classes.modalInput}
                onDayChange={day => handleChange2("startDate", day)}
                />

                <FormControl className={classes.modalInput}>
                <InputLabel id="demo-simple-select-label">Period</InputLabel>
                <Select native name="period" onChange={handleChange}>
                    <option value="" />
                    {array.map(instance => {
                    return <option key={instance.id} value={instance.id}>{instance.text}</option>;
                    })}
                </Select>
                </FormControl>

                <FormControl className={classes.modalInput}>
                <InputLabel id="demo-simple-select-label">Pacing</InputLabel>
                <Select native name="pacing" onChange={handleChange}>
                    <option value="" />
                    <option key={0} value="basic">Basic</option>
                    <option key={1} value="general">General</option>
                    <option key={2} value="advanced">Advanced</option>
                    <option key={3} value="heavy_lab">Heavy Lab</option>
                </Select>
                </FormControl>

                <FormControl className={classes.modalInput}>
                <InputLabel id="demo-simple-select-label">Textbook</InputLabel>
                <Select native name="textbook" onChange={handleChange}>
                    <option value="" />
                    {textbooks.map(instance => {
                        return <option key={instance} value={instance}>{instance}</option>;
                    })}
                </Select>
                </FormControl>

                <SelectChapterBtn textbook={textbook} />
            
                <FormControlLabel
                control={
                    <Switch
                    checked={isAutoAdjust}
                    color="primary"
                    value="isAutoAdjust"
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
                startIcon={<PublishIcon />}
                onClick={addAppoint}
                >
                Import
                </Button>
            </form>
            </div>
        </Modal>
        </div>
    );
}
