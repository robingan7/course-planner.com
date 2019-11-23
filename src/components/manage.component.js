import React, { Component } from "react";
import PlansList from "./plansList.component";
import BlocksAndSche from "./blocksAndSchedule.component";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

export default class Manage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="regular-container">
            <h1>Manage</h1>
            <div className="manageContent">
              <h2 className="subTitle">Plans</h2>
              <PlansList name="jjj"/>
              <Grid item className="toolKit">
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  aria-label="full-width contained primary button group"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <h2 className="subTitle">Blocks & Textbook</h2>
              <BlocksAndSche />
            </div>
          </div>
        );
    };
}