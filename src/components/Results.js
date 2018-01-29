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
    this.userSubmitFilter = this.userSubmitFilter.bind(this);
  }

  componentWillMount(){
    this.fetchVariableData(this.props.selectedProjects);
  }

  componentWillReceiveProps(nextProps){
    this.fetchVariableData(nextProps.selectedProjects);
  }

  shouldComponentUpdate(nextProp, nextState){
    if(nextProp.update){
      return true;
    }
    return false;
  }

  fetchVariableData(selectedProjects){
    Api.fetchProjectVariables(selectedProjects)
      .then(res => {
        this.filterResults(res.data);
      })
      .catch((err) => {
        this.setState({
          results: 'error'
        });
      });
  }

  userSubmitFilter(event){
    let newfilterInput = event.target.value.trim();
    if(this.state.filterInput !== newfilterInput){
      this.setState({
        filterInput: newfilterInput
      });
    }
    if(event.key === 'Enter'){
      this.filterResults(this.state.results);
    }
  }

  filterResults(variableRes){
    const userInput = this.state.filterInput.toLowerCase();
    let newVarRes = {};
    Object.keys(variableRes).forEach(key=>{
      Object.keys(variableRes[key]).filter(subKey => {
        return subKey.toLowerCase().includes(userInput);
      }).reduce((result, variableName) => {
          if(!(key in newVarRes)){
            newVarRes[key] = {};
          }
          newVarRes[key][variableName] = variableRes[key][variableName];
          return newVarRes;
      }, newVarRes);
    });
    this.setState({
      results: newVarRes
    });
  }

  render() {
    const variableRes = this.state.results;
    if(Object.keys(variableRes) === 0){
      return(<Spinner className="loading-symbol" name="ball-scale-multiple" color="grey"/>);
    }else if(variableRes === 'error'){
      return(<div className="Results" style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    }else{
      const keys = Object.keys(variableRes).reduce((array, itm) => {
        return array.concat(itm);
      },[]);
      return(
        <div className="Results">
          <input
            className="filter-word"
            type="text"
            placeholder="keyword"
            onKeyDown={this.userSubmitFilter}
          />
          {keys.map(key =>
              <div id="variable-results" key={key}>
                <strong id="project-name">{key.toUpperCase()}</strong>
                <ol>
                  {Object.keys(variableRes[key]).map(varName =><li key={varName}>{varName}</li>)}
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
