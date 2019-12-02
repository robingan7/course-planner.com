import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from "@material-ui/icons/Cancel";
import "react-day-picker/lib/style.css";
import ListItem from '@material-ui/core/ListItem';
import {TEXTBOOKS} from "../../../../data/textbook";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ChapterSelector from "./table.component";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  modalInput: {
    width: 209,
    marginLeft: "calc(50% - 104.5px)",
    marginBottom: 15
  },
  marginn: {
    marginLeft: 10,
    minWidth: 90,
    marginBottom: 5
  },
  modalInputBig: {
    width: 309,
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
  },
  root: {
    width: "100%",
    maxWidth: 860,
    backgroundColor: theme.palette.background.paper,
    margin: "0px auto",
    height: 400,
    overflow: "auto",
    marginBottom: 10,
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function SelectChapterBtn(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);
    const [openC, setOpenC] = React.useState({});
    const [openCC, setOpenCC] = React.useState(false);
    const [error, setError] = React.useState("");
    const [textbook, setTextbook] = React.useState("");
    const [chapters, setChapters] = React.useState([]);
    const [pacing, setPacing] = React.useState("");
    const [chapter, setChapter] = React.useState("");
    const { textbooks} = props;
    const [currentTextbook, setCurrentTextbook] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isFullFilled = () => {
        return true;
    }

    const handleChange = (e) => {
        const {
            target: { name, value }
        } = e;

        switch (name) {
          case "textbook":
            setTextbook(value);
            let textbookJson = TEXTBOOKS[value];
            if (TEXTBOOKS[value] == undefined) {
              textbookJson = [];
            }
            setCurrentTextbook(textbookJson);
            let list = [];
            for (let ele of textbookJson) {
              list.push(ele.chapterName);
            }

            setChapters(list);
            break;
          case "chapter":
            setChapter(value);
            break;
          case "pacing":
            setPacing(value);
            break;
          default:
            console.log("invalid name");
        }
    }

    return (
      <div>
        <Button
          type="button"
          onClick={handleOpen}
          variant="contained"
          color="default"
          startIcon={<PublishIcon />}
        >
          0 Chapters Selected
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className="modalBody modalTable">
            <Grid item className="closeIconGrid">
              <CancelIcon className="closeIcon" onClick={handleClose} />
            </Grid>
            <h2 id="simple-modal-title" className="modalTitle">
              Chapter Selector
            </h2>

            <h3 className="modalError">{error}</h3>
            <FormControl className={classes.marginn}>
              <InputLabel id="demo-simple-select-label">Textbook</InputLabel>
              <Select native name="textbook" onChange={handleChange}>
                <option value="" />
                {textbooks.map(instance => {
                  return (
                    <option key={instance} value={instance}>
                      {instance}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.marginn}>
              <InputLabel id="demo-simple-select-label">Chapters</InputLabel>
              <Select native name="chapter" onChange={handleChange}>
                <option value="" />
                {chapters.map(instance => {
                  return (
                    <option key={instance} value={instance}>
                      {instance}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.marginn}>
              <InputLabel id="demo-simple-select-label">Pacing</InputLabel>
              <Select native name="pacing" onChange={handleChange}>
                <option value="" />
                <option key={0} value="basic">
                  Basic
                </option>
                <option key={1} value="general">
                  General
                </option>
                <option key={2} value="advanced">
                  Advanced
                </option>
                <option key={3} value="heavy_lab">
                  Heavy Lab
                </option>
              </Select>
            </FormControl>

            <FormControl className={classes.marginn}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <SearchIcon />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Search" />
                </Grid>
              </Grid>
            </FormControl>

            <form className={classes.form}>
              <ChapterSelector />
              <Button
                variant="contained"
                color="primary"
                className={classes.modalBtn}
                startIcon={<PublishIcon />}
              >
                Select
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
}
