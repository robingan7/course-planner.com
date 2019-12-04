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
import SelectChapterBtn from './import/selectChapters.component';
import Preview from './import/preview.component';
import { getCurrentDate, getNextDay, addDefaultTime} from "../../../data/constants";

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
    const [open, setOpen] = React.useState(false);
    const [isAutoAdjust, setIsAutoAdjust] = React.useState(true);
    const [error, setError] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [period, setPeriod] = React.useState("");
    const [selected, setSelected] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState("");
    const [pacing, setPacing] = React.useState("");
    const [preview, setPreview] = React.useState(false);
    const [previewList, setPreviewList] = React.useState([]);
    const [orgPreviewList, setOrgPreviewList] = React.useState([]);

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
        return startDate !== "" && period !== "" && selected.length !== 0 && pacing !== "";
    }

    const closePreview = () => {
        setPreview(false);
    }

    const openReview = () => {
        setError("");
        if (!isFullFilled()) {
            setError("Please fill in all the fields");
        } else {
            let pacingIndex = 1;
            switch(pacing){
                case 'basic':
                    pacingIndex = 1;
                    break;
                case 'general':
                    pacingIndex = 2;
                    break;
                case 'advanced':
                    pacingIndex = 3;
                    break;
                case 'heavy_lab':
                    pacingIndex = 4;
                    break;
                default:
                    console.log("error in openReview");
            }

            let result = [];
            for(let ele of selected) {
                let list = ele.split('_');
                result.push({ name: list[0], days: list[pacingIndex]});
            }
            setPreview(true);
            setPreviewList(result);
            setOrgPreviewList(result);
        }
    }

    const formatFromImports = arr => {
        let startDateOrg = getCurrentDate(startDate);//y-m-d
        let result = [];

        for(let ele of arr) {
            let title = ele.name;
            let duration = ele.days;

            for(let i = 0; i < duration; i++) {
                startDateOrg = getNextDay(new Date(startDateOrg));//date obj
                let appoint = {
                    title: title,
                    period: period,
                    endDate: startDateOrg,
                    startDate: startDateOrg,
                    notes: "",
                    isAutoAdjust: isAutoAdjust
                }
                result.push(addDefaultTime(appoint));
            }
        }
        return result;
    }

    const importToPlanner = () => {
        let result = formatFromImports(previewList);
        appointFunc(result, "import");
    }

    let array = [];
    for (let resource of resources) {
        if (resource.fieldName === "period") {
            array = resource.instances;
        }
    };

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
                        if (instance.id !== "Off"){
                            return <option key={instance.id} value={instance.id}>{instance.text}</option>;
                        }
                    })}
                </Select>
                </FormControl>
            
                <SelectChapterBtn textbooks={textbooks} selected={selected} setSelected={setSelected} searchInput={searchInput}
                    setSearchInput={setSearchInput} pacing={pacing} setPacing={setPacing}
                />

                <Preview open={preview} handleClose={closePreview} previewList={previewList} 
                    setPreviewList={setPreviewList} orgPreviewList={orgPreviewList} importToPlanner={importToPlanner}
                />
                    
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
                onClick={openReview}
                >
                Import
                </Button>
            </form>
            </div>
        </Modal>
        </div>
    );
}
