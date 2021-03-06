import Results from './Results';
import { fetchProjectNames } from '../actions/fetchDataAction';
import '../css/Search.css';

import React, { Component } from 'react';
import { Button } from 'react-mdl';
import { connect } from 'react-redux';
import { DoubleBounce } from 'better-react-spinkit';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      selectedProjects: [],
      updateResults: false
    }
    this.selectedProjects = [];
  }

  componentWillMount() {
    if(!this.props.projectNames.length)
      this.props.fetchProjectNames();
  }

  submitCheckbox = () => {
    if(this.selectedProjects.length > 0) {
      this.setState({
        selectedProjects: this.selectedProjects,
        updateResults: true
      });
    }
  }

  toggleChange = (event) => {
    const selectedProject = event.target.name;
    const indexOfProject = this.selectedProjects.indexOf(selectedProject);
    if(indexOfProject !== -1) {
      this.selectedProjects = this.selectedProjects.filter((itm, i) => i !== indexOfProject);
    } else {
      this.selectedProjects = this.selectedProjects.concat(selectedProject);
    }
  }

  render() {
    if(this.props.isProjectNamesLoading) {
      return(<DoubleBounce size={50} />);
    } else if(this.props.projectNameError) {
      return(<div style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    } else {
      const projectNames = this.props.projectNames;
      return(
        <div className="Search">
          <ul className="checkbox-grid">
            <h4>Popluar Javascript Repo</h4>
            <ProjectCheckboxes names={projectNames} that={this} />
            <Button raised ripple id="checkBox-submit" onClick={this.submitCheckbox}>
              Submit
            </Button>
          </ul>
          {this.state.selectedProjects.length > 0 ? <Results update={this.state.updateResults} selectedProjects={this.state.selectedProjects}/> : null}
        </div>
      );
    }
  }
}

const ProjectCheckboxes = ({names, that}) => {
  return(
    names.map(name => (
      <li key={name}><label>
        <input
          name={name}
          type="checkbox"
          onChange={that.toggleChange}
        />
        {name}
      </label></li>
      )
    )
  );
}

const mapStateToProps = (state) => {
  return {
    projectNames: state.fetchProjNamesReducer.projectNames,
    isProjectNamesLoading: state.fetchProjNamesReducer.projectNamesIsLoading,
    projectNameError: state.fetchProjNamesReducer.fetchProjectNameHasError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjectNames: () => dispatch(fetchProjectNames()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
