import React from "react";
import EditBtn from './modalButton/editBtn.component'
import DeleteSingle from "./modalButton/deleteSingle.component";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: '#fff',
    marginLeft:'10px',
    height:'400px',
    overflow: 'auto',
    boxShadow: "0 18px 28px rgba(0,0,0,0.35), 0 10px 20px rgba(0,0,0,0.32)"
  }
}));

export default function PlansList(props) {
    console.log(props);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {[2.2, 2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.1].map(value => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Unit ${value}`} />
            <ListItemSecondaryAction>
              <EditBtn planName={value} />
              <DeleteSingle planName={value} />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
