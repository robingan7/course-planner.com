import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from "@material-ui/icons/Cancel";
import "react-day-picker/lib/style.css";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import BookIcon from '@material-ui/icons/Book';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import {TEXTBOOKS} from "../../../../data/textbook";

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
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        margin:"0px auto",
        height:450,
        overflow:"auto",
        marginBottom:10,
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    },
    nested: {
        paddingLeft: theme.spacing(4),
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
    const { textbook } = props;
    
    const [currentTextbook, setCurrentTextbook] = React.useState(TEXTBOOKS[textbook]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isFullFilled = () => {
        return true;
    }

    const handleClick2 = event => {
        let name = "Ch.1 Science of Physics";
        let old = !openC[name];
        openC[name] = old;
        console.log(openC);
        setOpenC(openC);
    };

    const handleClick = event => {
        console.log("object");
        setOpenCC(!openCC);
    };

    const renderFinish = (arr) => {
        setTimeout(() => {
            setOpenC(arr);
            console.log(arr);
        }, 1000);
    }

    const checkChange = event => {
        console.log(event.target.name);
    }

    const formatTextbook = () => {
        if (textbook.length === 0){
            return (
                <ListItem>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={false}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': 0 }}
                        />
                    </ListItemIcon>
                    <ListItemText primary="Select a textbook first" />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                            <BookIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        }

        let book = TEXTBOOKS[textbook];
        let buffer = [];
        let copyC = openC;
        for (let ele of book) {
            openC[ele.chapterName] = false
            copyC[ele.chapterName] = false
            buffer.push((<ListItem key={ele.chapterName} >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': 0 }}
                        onChange={checkChange}
                        name="main"
                    />
                </ListItemIcon>
                <ListItemText primary={ele.chapterName} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" onClick={handleClick} >
                        {openCC? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            ));
            
            ele.subChapter.map(chapter => {
                buffer.push((
                    <Collapse in={openCC} timeout="auto" unmountOnExit key={chapter.chapterName + "Collapse"} >
                        <ListItem className={classes.nested} id={chapter.chapterName}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': 1 }}
                                    value={chapter.chapterName}
                                    onChange={checkChange}
                                    name="sub"
                                />
                            </ListItemIcon>
                            <ListItemText primary={chapter.chapterName} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <BookmarksIcon />
                                </IconButton>
                                
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Collapse>
                ));
            })
        }

        renderFinish(copyC);
        return buffer;
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
            <div className="modalBody">
            <Grid item className="closeIconGrid">
                <CancelIcon className="closeIcon" onClick={handleClose} />
            </Grid>
            <h2 id="simple-modal-title" className="modalTitle">
                Select Chapters from <span className="planName">{textbook}</span>
            </h2>

            <h3 className="modalError">{error}</h3>

            <form className={classes.form}>
                <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
                >
                   {
                        formatTextbook()
                    }
                </List>

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
