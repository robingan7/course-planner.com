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
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const { appointments,
          appointFunc,
          resources } = props;

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

  const generateList = () => {
    if (appointments.length !== 0){
      let plansList = [];
      let id = 0;
      appointments.map(appointment => {
        const labelId = `checkbox-list-label-${appointment.title}`;
        plansList.push( 
          (<ListItem
            key={appointment.title}
            role={undefined}
            dense
            button
            onClick={handleToggle(appointment.title)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={appointment.title} />
            <ListItemSecondaryAction>
              <EditBtn id={id} planName={appointment.title} appointment={appointment} 
                appointFunc={appointFunc}
                resources={resources}/>
              <DeleteSingle planName={appointment.title} />
            </ListItemSecondaryAction>
          </ListItem>));
          id++;
      });

      return plansList;
    } else {
      return (
      <ListItem>
          <ListItemText key={"No plans"} primary={"No plans"} />
      </ListItem>
      );
    }
  }

  return (
    <List className={classes.root}>
      {
        generateList()
      }
    </List>
  );
}