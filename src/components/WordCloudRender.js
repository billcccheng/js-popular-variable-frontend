import React, { Component } from "react";
import Select from "react-select";
import WordCloud from "react-d3-cloud";
import { connect } from "react-redux";
import { DoubleBounce } from "better-react-spinkit"
import { fetchWCProjectNames, fetchWCSingleProjectVariables } from "../actions/fetchDataAction";
import { wcSimpleFilter, clearShowResultsTree } from "../actions/fetchDataAction";
import "react-select/dist/react-select.css";
import "../css/WordCloudRender.css";

class WordCloudRender extends Component {
  constructor() {
    super();
    this.filterInput = "";
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    if(this.props.wcProjectNames.length === 0 ) {
      this.props.fetchWCProjectNames();
    }
    this.selectedProject = "";
  }

  componentWillUnmount() {
    this.props.clearShowResultsTree();
  }

  onSelectChange(selectedProject) {
    this.selectedProject = selectedProject.value;
    const recievedProjects = this.props.wcSavedProjects;
    if(recievedProjects.indexOf(selectedProject.value) !== -1) {
      this.props.filterWC(this.selectedProject, this.filterInput);
    } else {
      this.props.fetchWCSingleProjectVariables(this.selectedProject);
    }
  }

  onFilterChange(event) {
    if(event.key === "Enter") {
      const newFilterInput = event.target.value.trim();
      this.filterInput = newFilterInput;
      this.props.filterWC(this.selectedProject, this.filterInput);
    }
  }

  render() {
    const fontSizeMapper = word => Math.log2(word.value) * 6;
    //const rotate = word => Math.random() * 20;
    if(this.props.isLoading) {
      return(<DoubleBounce size={50} />);
    } else {
      const widthOfWC = document.getElementById("word-cloud") ? document.getElementById("word-cloud").offsetWidth : 400;
      return(
        <div id="word-cloud">
          <div id="word-cloud-note"> Node has been excluded in word cloud due to it's large volume of variables. </div>
          <Select
            className="project-select"
            placeholder="Select a JavaScript Project"
            value={this.selectedProject}
            options={this.props.wcProjectNames}
            onChange={this.onSelectChange}
            clearable={false}
            deleteRemoves={false}
            backspaceRemoves={false}
          />
          {!this.props.wcIsLoading && this.props.wcShowResults.length > 0 ?
            <div>
              <input
                className="filter-word"
                type="text"
                placeholder="filter keyword"
                onKeyDown={this.onFilterChange}
              />
              <WordCloud
                data={this.props.wcShowResults}
                width={widthOfWC}
                fontSizeMapper={fontSizeMapper}
              />
            </div> : <ShowLoading project={this.selectedProject} />
          }
        </div>
      );
    }
  }
}

function ShowLoading({project}) {
  return (project !== "" && <DoubleBounce size={40} />);
}

const mapStateToProps = (state) => {
  return {
    wcProjectNames: state.wordCloudReducer.data,
    isLoading: state.wordCloudReducer.isLoading,
    wcSavedProjects: Object.keys(state.wordCloudReducer.wcSavedData),
    wcShowResults: state.wordCloudReducer.wcShowData,
    wcIsLoading: state.wordCloudReducer.wcIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWCProjectNames: () => dispatch(fetchWCProjectNames()),
    fetchWCSingleProjectVariables: (project) => dispatch(fetchWCSingleProjectVariables(project)),
    filterWC: (selectedProject, filter) => dispatch(wcSimpleFilter(selectedProject, filter)),
    clearShowResultsTree: () => dispatch(clearShowResultsTree())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WordCloudRender);
