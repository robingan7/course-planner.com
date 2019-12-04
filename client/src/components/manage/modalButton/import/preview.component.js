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
import RestoreIcon from '@material-ui/icons/Restore';

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
    const { open, handleClose, previewList, setPreviewList, orgPreviewList, importToPlanner} = props;
    const [error, setError] = React.useState("");

    const handleChange = event => {
        const {value, id} = event.target;
        let index = Number(id.split('_')[0]);
        let name = id.split('_')[1];

        let copy = previewList.slice();
        copy[index][name] = value;
        setPreviewList(copy);
    }

    const onDelete = event => {
        let index = event.target.id;
        if(index === "") {
            index = event.target.farthestViewportElement.id;
        }

        let copy = previewList.slice();
        copy.splice(index, 1);
        setPreviewList(copy);
    }

    const onRestore = () => {
        setPreviewList(orgPreviewList);
    }

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
            <IconButton className="previewRestore" onClick={onRestore}>
                <RestoreIcon />
            </IconButton>
            <h2 id="simple-modal-title" className="modalTitle">
                Preview
            </h2>

            <h3 className="modalError">{error}</h3>

            <form className={classes.form}>
                <div className="previewList">
                {
                    previewList.map((ele, index) => {
                        return(
                            <div className="preview" key={index + "_preview"}>
                                <TextField label="Name" id={index + "_name"} key={index + "_name"} value={ele.name} size="small" className="previewName" 
                                    onChange={handleChange}
                                />
                                <TextField label="Days" id={index + "_days"} key={index + "_days"} value={ele.days} size="small" className="previewDuration" 
                                    onChange={handleChange}
                                />

                                <IconButton className="previewDelete" key={index} id={index} onClick={onDelete}>
                                    <CancelIcon id={index}/>
                                </IconButton>
                            </div>
                        );
                    })
                }
                </div>

                    
                <Button
                variant="contained"
                color="primary"
                className={classes.modalBtn}
                startIcon={<AddIcon />}
                onClick={importToPlanner}
                >
                Add
                </Button>
            </form>
            </div>
        </Modal>
    );
}
