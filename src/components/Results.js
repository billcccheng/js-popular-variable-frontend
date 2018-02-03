import Api from '../utils/Api.js';
import React, { Component } from 'react';
import { DoubleBounce } from 'better-react-spinkit'
import '../css/Results.css'

class Results extends Component {
  constructor(){
    super();
    this.state = {
      results: {},
      filteredResults: {},
      isLoading: false,
      error: false
    }
    this.receivedProjects = [];
    this.filterInput = "";
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    this.fetchVariableData(this.props.selectedProjects);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchVariableData(nextProps.selectedProjects);
  }

  fetchVariableData(selectedProjects) {
    const _receivedProjects = this.receivedProjects;
    const unFetchedProjects =  selectedProjects.filter(itm => !_receivedProjects.includes(itm))
    this.receivedProjects  = _receivedProjects.concat(unFetchedProjects);
    if(unFetchedProjects.length === 0) {
      this.filterResults(this.state.results, selectedProjects);
    }
    if(unFetchedProjects.length > 0) {
      this.setState({
        isLoading: true
      });
      Api.fetchProjectVariables(unFetchedProjects)
        .then(res => {
          this.setState({
            results: {...this.state.results, ...res.data}
          }, () => {
            this.filterResults(this.state.results, selectedProjects);
          });
        })
        .catch((err) => {
          this.setState({
            error: true
          });
        });
    }
  }

  filterResults(results, selectedProjects) {
    const userInput = this.filterInput.toLowerCase();
    let updatedResults = {};
    selectedProjects.forEach(projectName => {
      projectName = projectName.charAt(0).toLowerCase() + projectName.slice(1);
      updatedResults[projectName] = {};
      if(projectName in results){
        const variableNames = Object.keys(results[projectName]);
        variableNames.filter(variableName => {
          return variableName.toLowerCase().includes(userInput);
        }).map((variableName) => {
          updatedResults[projectName][variableName] = results[projectName][variableName];
          return updatedResults;
        });
      }
    });
    this.setState({
      filteredResults: updatedResults,
      isLoading: false
    });
  }

  onFilterChange(event) {
    if(event.key === 'Enter') {
      const newFilterInput = event.target.value.trim();
      if(this.filterInput !== newFilterInput) {
          this.filterInput = newFilterInput
      }
      this.filterResults(this.state.results, this.props.selectedProjects);
    }
  }

  render() {
    if(this.state.error) {
      return(<div className="Results" style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    }

    if(this.state.isLoading) {
      return(<DoubleBounce size={50} />);
    } else {
      const results = this.state.filteredResults;
      const projectNames = Object.keys(results);
      return(
        <div className="Results">
          <input
            className="filter-word"
            type="text"
            placeholder="filter keyword"
            onKeyDown={this.onFilterChange}
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
