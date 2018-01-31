import React, { Component } from 'react';
import Api from '../utils/Api';
import { DoubleBounce } from 'better-react-spinkit'
import './Results.css'

class Results extends Component {
  constructor(){
    super();
    this.state = {
      results: {},
      filteredResults: {},
      receivedProjects: new Set(),
      filterInput: "",
      error: false
    }
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    this.fetchVariableData(this.props.selectedProjects);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchVariableData(nextProps.selectedProjects);
  }

  shouldComponentUpdate(nextProp, nextState) {
    if(nextProp.update){
      return true;
    }
    return false;
  }

  fetchVariableData(selectedProjects) {
    const updatedReceivedProjects = this.state.receivedProjects;
    let fetchProjects = [];
    this.props.selectedProjects.forEach((project) => {
      if(!updatedReceivedProjects.has(project)) {
        updatedReceivedProjects.add(project);
        fetchProjects.push(project);
      }
    });
    this.setState({
      receivedProjects: updatedReceivedProjects
    });
    if(fetchProjects.length > 0) {
      Api.fetchProjectVariables(fetchProjects)
        .then(res => {
          this.setState({
            results: Object.assign({}, this.state.results, res.data)
          }, () => {
            this.filterResults(this.state.results, selectedProjects);
          });
        })
        .catch((err) => {
          this.setState({
            error: true
          });
        });
    } else {
      this.filterResults(this.state.results, selectedProjects);
    }
  }

  onFilterChange(event) {
    if(event.key === 'Enter') {
      const newFilterInput = event.target.value.trim();
      if(this.state.filterInput !== newFilterInput) {
        this.setState({
          filterInput: newFilterInput
        });
      }
      this.filterResults(this.state.results, this.props.selectedProjects);
    }
  }

  filterResults(results, selectedProjects) {
    const userInput = this.state.filterInput.toLowerCase();
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
      filteredResults: updatedResults
    });
  }

  render() {
    const results = this.state.filteredResults;
    if(Object.keys(results) === 0) {
      return(<DoubleBounce size={50} />);
    } else if(this.state.error) {
      return(<div className="Results" style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    } else {
      const projectNames = Object.keys(results).reduce((array, itm) => {
        return array.concat(itm);
      },[]);
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
