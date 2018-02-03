import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DoubleBounce } from 'better-react-spinkit'
import { fetchProjectVariables } from '../actions/fetchDataAction';
import '../css/Results.css'

class Results extends Component {
  constructor(){
    super();
    this.state = {
    }
    this.receivedProjects = [];
    this.filterInput = "";
    this.onFilterChange = this.onFilterChange.bind(this);
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Results);
