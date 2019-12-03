import React, { Component } from "react";
import PlansList from "../manage/plansList.component";
import AddBtn from "../manage/modalButton/addBtn.component";
import DeleteMutipleBtn from "../manage/modalButton/deleteMutiple.component";
import ImportBtn from "../manage/modalButton/importBtn.component";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Imports from "../manage/imports.component";
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

export default class Manage extends Component {
  constructor(props) {
    super(props);
    const {
      appointments,
      appointFunc,
      resources,
      blocks,
      textbooks,
      updateImports
    } = this.props;
    
    this.state = {
      deleteList: [],
      search: "",
      periodFilter: "",
      periodOption: resources[0].instances,
      clone_appointment: appointments
    }
    this.setDeleteList = this.setDeleteList.bind(this);
    this.deleteMultiple = this.deleteMultiple.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  setDeleteList(arr){
    this.setState({ deleteList: arr});
  }

  deleteMultiple(isAutoAdjust){
    this.props.appointFunc({ isAutoAdjust: isAutoAdjust }, "delete", this.state.deleteList);
  }

  onSearch(event){
    let value = event.target.value;
    let copy = this.props.appointments.slice();

    this.setState({
      clone_appointment: copy.filter(n => {
        return n.period === this.state.periodFilter || this.state.periodFilter === "";
      }).filter(n => {
      return n.title.indexOf(value) !== -1 || value === "";
    }), search: value });
  }

  onFilter(event) {
    let value = event.target.value;
    let copy = this.props.appointments.slice();

    this.setState({
      clone_appointment: copy.filter(n => {
        return n.title.indexOf(this.state.search) !== -1 || this.state.search === "";
      }).filter(n => {
        return n.period === value || value === "";
      }), periodFilter: value
    });
  }

  render() {
    const {
      appointFunc,
      resources,
      blocks,
      textbooks,
      updateImports
    } = this.props;

    const { search, periodFilter, periodOption, clone_appointment} = this.state;

      return (
        <div className="regular-container">
          <h1>Manage</h1>
          <div className="manageContent">
            <h2 className="subTitle">Plans</h2>
            <FormControl className="planListSearch">
              <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                value={search}
                onChange={this.onSearch}
              />
            </FormControl>
            <FormControl className="planListPeriod" >
              <InputLabel htmlFor="age-native-simple">Period</InputLabel>
              <Select
                native
                value={periodFilter}
                onChange={this.onFilter}
              >
                <option value="" />
                {
                  periodOption.map(n => {
                    return <option key={n.id} value={n.id} >{n.text}</option>
                  })
                }
              </Select>
            </FormControl>
            <PlansList appointments={clone_appointment} 
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
                <ImportBtn 
                  appointFunc={appointFunc}
                  resources={resources}
                  textbooks={textbooks}
                />
                <DeleteMutipleBtn numberOfPlans={this.state.deleteList.length} deleteMultiple={this.deleteMultiple}/>
              </ButtonGroup>
            </Grid>
            <h2 className="subTitle subTitleImport">Imports</h2>
            <Imports resources={resources} blockOption={blocks} textbookOption={textbooks} updateImports={updateImports}/>
          </div>
        </div>
      );
    };
}