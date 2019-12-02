import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

export default function Toast(props) {
    const classes = useStyles();
    const { isOpen, controlToast} = props;

    const handleClick = () => {
        controlToast(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        controlToast(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Updated successfully!!</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                        UNDO
          </Button>,
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    );
}