import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DoubleBounce } from 'better-react-spinkit'
import { fetchProjectVariables, simpleFilter } from '../actions/fetchDataAction';
import '../css/Results.css'

class Results extends Component {
  constructor(){
    super();
    this.receivedProjects = [];
    this.filterInput = "";
  }

  componentWillMount() {
    this.fetchVariableData(this.props.selectedProjects);
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.selectedProjects) !== JSON.stringify(nextProps.selectedProjects)) {
      this.fetchVariableData(nextProps.selectedProjects);
    }
  }

  fetchVariableData(selectedProjects) {
    const _receivedProjects = this.receivedProjects;
    const unFetchedProjects =  selectedProjects.filter(itm => !_receivedProjects.includes(itm))
    this.receivedProjects  = _receivedProjects.concat(unFetchedProjects);
    if(unFetchedProjects.length === 0) {
      this.props.fetchProjectVariables(selectedProjects, this.filterInput, unFetchedProjects);
    }
    if(unFetchedProjects.length > 0) {
      this.props.fetchProjectVariables(selectedProjects, this.filterInput, unFetchedProjects);
    }
  }

  onFilterChange = (event) => {
    if(event.key === 'Enter') {
      const newFilterInput = event.target.value.trim();
      if(this.filterInput !== newFilterInput) {
          this.filterInput = newFilterInput
      }
      this.props.simpleFilter(this.props.selectedProjects, this.filterInput);
    }
  }

  render() {
    if(this.props.hasError) {
      return(<div className="Results" style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    }

    if(this.props.isLoading) {
      return(<DoubleBounce size={50} />);
    } else {
      const results = this.props.filteredResults;
      const projectNames = Object.keys(results);
      return(
        <div className="Results">
          <input
            className="filter-word"
            type="text"
            placeholder={this.filterInput.length > 0 ? this.filterInput : "Filter"}
            onKeyDown={this.onFilterChange}
          />
          <ProjectVariableList results={results} projectNames={projectNames}/>
        </div>
      );
    }
  }
}

const ProjectVariableList = ({projectNames, results}) => {
  return (
    projectNames.map(projectName =>
      <div id="variable-results" key={projectName}>
        <strong id="project-name">{projectName.toUpperCase()}</strong>
        <ol>
          {Object.keys(results[projectName]).map(variableName =>
            <li key={variableName}>{variableName}</li>)
          }
        </ol>
      </div>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    results: state.fetchProjVarReducer.results,
    filteredResults: state.fetchProjVarReducer.filteredResults,
    isLoading: state.fetchProjVarReducer.isLoading,
    hasError: state.fetchProjVarReducer.hasError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjectVariables: (projects, filters, unFetchedProjects) => dispatch(fetchProjectVariables(projects, filters, unFetchedProjects)),
    simpleFilter: (selectedProjects, filters) => dispatch(simpleFilter(selectedProjects, filters))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Results);
