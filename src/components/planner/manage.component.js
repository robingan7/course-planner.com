import React, { Component } from "react";
import PlansList from "../manage/plansList.component";
import BlocksAndSche from "../manage/blocksAndSchedule.component";
import AddBtn from "../manage/modalButton/addBtn.component";
import DeleteMutipleBtn from "../manage/modalButton/deleteMutiple.component";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

export default class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteList: []
    }
    this.setDeleteList = this.setDeleteList.bind(this);
    this.deleteMultiple = this.deleteMultiple.bind(this);
  }

  setDeleteList(arr){
    this.setState({ deleteList: arr});
  }

  deleteMultiple(isAutoAdjust){
    this.props.appointFunc({ isAutoAdjust: isAutoAdjust }, "delete", this.state.deleteList);
  }

  render() {
    const {
      appointments,
      appointFunc,
      resources
    } = this.props;

        return (
          <div className="regular-container">
            <h1>Manage</h1>
            <div className="manageContent">
              <h2 className="subTitle">Plans</h2>
              <PlansList appointments={appointments} 
                appointFunc={appointFunc}
                resources={resources}
                setDeleteList={this.setDeleteList}
                deleteList={this.state.deleteList}
              />
              <Grid item className="toolKit">
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  aria-label="full-width contained primary button group"
                  style={{ marginLeft: 10 }}
                >
                  <AddBtn
                    appointFunc={appointFunc}
                    resources={resources}
                  />
                  <DeleteMutipleBtn numberOfPlans={this.state.deleteList.length} deleteMultiple={this.deleteMultiple}/>
                </ButtonGroup>
              </Grid>
              <h2 className="subTitle">Blocks & Textbook</h2>
              <BlocksAndSche />
            </div>
          </div>
        );
    };
}