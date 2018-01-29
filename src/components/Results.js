import React, { Component } from 'react';
import Api from '../utils/Api';
import Spinner from 'react-spinkit';
import './Results.css'

class Results extends Component {
  constructor(){
    super();
    this.state = {
      results: {},
      filterInput: ""
    }
    this.submitFilter = this.submitFilter.bind(this);
  }

  componentWillMount(){
    this.fetchVariableData(this.props.selectedProjects);
  }

  componentWillReceiveProps(nextProps){
    this.fetchVariableData(nextProps.selectedProjects);
  }

  shouldComponentUpdate(nextProp, nextState){
    if(nextProp.update)
      return true;
    return false;
  }

  fetchVariableData(selectedProjects){
    Api.fetchProjectVariables(selectedProjects)
      .then(res => {
        this.setState({
          results: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          results: 'error'
        });
      });
  }

  changeFilterInput(event){
    let newfilterInput = event.target.value.trim();
    if(this.state.filterInput !== newfilterInput){
      this.setState({
        filterInput: newfilterInput
      });
    }
  }

  submitFilter(event){
    const userInput = this.state.filterInput;
    if(event.key === 'Enter'){
      console.log("ENTER");
      let variableRes = this.state.results;
      let newVarRes = {};
      Object.keys(variableRes).forEach(key=>{
        newVarRes[key] = Object.keys(variableRes[key]).filter(subKey => {
          return subKey.toLowerCase().includes(userInput);
        }).map(obj=>{
          console.log(variableRes[key]);
        });
      });
      console.log(newVarRes);
    }
  }

  render() {
    const variableRes = this.state.results;
    if(Object.keys(variableRes) === 0){
      return(<Spinner className="loading-symbol" name="ball-scale-multiple" color="grey"/>);
    }else if(variableRes === 'error'){
      return(<div className="Results" style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    }else{
      let keys = [];
      Object.keys(variableRes).forEach(key => {
        keys.unshift(key);
      });
      return(
        <div className="Results">
						<input
							className="filter-word"
							type="text"
							placeholder="keyword"
							onChange={this.changeFilterInput.bind(this)}
              onKeyDown={this.submitFilter}
            />
          {keys.map(key =>
              <div key={key}>
                {key.toUpperCase()}
                <ol>
                  {
                    Object.keys(variableRes[key]).map(varName =>
                      <li key={varName}>{varName}</li>
                    )
                  }
                </ol>
              </div>
            )
          }
        </div>
      );
    }
  }
}

export default Results;
