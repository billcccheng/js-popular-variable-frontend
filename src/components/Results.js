import React, { Component } from 'react';
import Api from '../utils/Api';
import Spinner from 'react-spinkit';
import './Results.css'

class Results extends Component{
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
    let newFilterInput = event.target.value.trim();
    if(this.state.filterInput !== newFilterInput){
      this.setState({
        filterInput: newFilterInput
      });
    }
    if(event.key === 'Enter'){
      this.filterResults(this.state.results);
    }
  }

  filterResults(results){
    const userInput = this.state.filterInput.toLowerCase();
    let updatedResults = {};
    const projectNames = Object.keys(results);
    projectNames.forEach(projectName => {
      updatedResults[projectName] = {};
      const variableNames = Object.keys(results[projectName]);
      variableNames.filter(variableName => {
        return variableName.toLowerCase().includes(userInput);
      }).map((variableName) => {
        updatedResults[projectName][variableName] = results[projectName][variableName];
        return updatedResults;
      });
    });

    this.setState({
      results: updatedResults
    });
  }

  render(){
    const results = this.state.results;
    if(Object.keys(results) === 0){
      return(<Spinner className="loading-symbol" name="ball-scale-multiple" color="grey"/>);
    }else if(results === 'error'){
      return(<div className="Results" style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    }else{
      const projectNames = Object.keys(results).reduce((array, itm) => {
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
          {projectNames.map(projectName =>
              <div id="variable-results" key={projectName}>
                <strong id="project-name">{projectName.toUpperCase()}</strong>
                <ol>
                  {Object.keys(results[projectName]).map(variableName =><li key={variableName}>{variableName}</li>)}
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
