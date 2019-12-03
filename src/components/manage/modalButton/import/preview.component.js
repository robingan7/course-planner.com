import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CancelIcon from "@material-ui/icons/Cancel";
import "react-day-picker/lib/style.css";
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';

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

export default function Preview(props) {
    const classes = useStyles();
    const { open, handleClose} = props;
    const [error, setError] = React.useState("");

    return (
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
                Preview
            </h2>

            <h3 className="modalError">{error}</h3>

            <form className={classes.form}>
                <div className="preview">
                    <TextField label="Name" id="standard-size-small" defaultValue="Sample" size="small" className="previewName"/>
                    <TextField label="Days" id="standard-size-small" defaultValue="0" size="small" className="previewDuration"/>
                    <IconButton className="previewDelete">
                        <CancelIcon/>
                    </IconButton>
                </div>

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
    );
}
