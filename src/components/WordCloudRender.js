import React, { Component } from "react";
import Select from "react-select";
import WordCloud from "react-d3-cloud";
import { connect } from "react-redux";
import { DoubleBounce } from "better-react-spinkit"
import { fetchWordCloudProjectNames, fetchWordCloudSingleProjectVariables, wcSimpleFilter } from "../actions/fetchDataAction";
import "react-select/dist/react-select.css";
import "../css/WordCloudRender.css";

class WordCloudRender extends Component {
  constructor() {
    super();
    this.selectedProject = "D3";
    this.filterInput = "";
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchWordCloudProjectNames();
    this.props.fetchWordCloudSingleProjectVariables(this.selectedProject);
  }

  onSelectChange(selectedProject) {
    this.selectedProject = selectedProject.value;
    const recievedProjects = Object.keys(this.props.wcSavedResults);
    if(recievedProjects.indexOf(selectedProject.value) !== -1) {
      this.props.filterWC(this.selectedProject, this.filterInput);
    } else {
      this.props.fetchWordCloudSingleProjectVariables(this.selectedProject);
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
    const rotate = word => Math.random() * 20;
    if(this.props.isLoading) {
      return(<DoubleBounce size={50} />);
    } else {
      return(
        <div id="word-cloud">
          <div id="word-cloud-note"> Node has been excluded in word cloud due to it's large volume of variables. </div>
          <Select
            className="project-select"
            placeholder="Select a JavaScript Project"
            value={this.selectedProject}
            options={this.props.wcProjectName}
            onChange={this.onSelectChange}
            clearable={false}
            deleteRemoves={false}
            backspaceRemoves={false}
          />
          {!this.props.wcIsLoading && this.props.wcResults.length > 0 ?
            <div>
              <input
                className="filter-word"
                type="text"
                placeholder="filter keyword"
                onKeyDown={this.onFilterChange}
              />
              <WordCloud
                data={this.props.wcResults}
                width={document.getElementById("word-cloud").offsetWidth}
                fontSizeMapper={fontSizeMapper}
                rotate={rotate}/>
            </div> :
            <DoubleBounce size={40} />
          }
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wcProjectName: state.wordCloudReducer.data,
    isLoading: state.wordCloudReducer.isLoading,
    wcSavedResults: state.wordCloudReducer.wcSavedData,
    wcResults: state.wordCloudReducer.wcShowData,
    wcIsLoading: state.wordCloudReducer.wcIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWordCloudProjectNames: () => dispatch(fetchWordCloudProjectNames()),
    fetchWordCloudSingleProjectVariables: (project) => dispatch(fetchWordCloudSingleProjectVariables(project)),
    filterWC: (selectedProject, filter) => dispatch(wcSimpleFilter(selectedProject, filter))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WordCloudRender);
