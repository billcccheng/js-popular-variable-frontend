import React, { Component } from 'react';
import Select from 'react-select';
import { DoubleBounce } from 'better-react-spinkit'
import Api from '../utils/Api';
import WordCloud from 'react-d3-cloud';
import 'react-select/dist/react-select.css';
import '../css/WordCloudRender.css';

class WordCloudRender extends Component {
  constructor() {
    super();
    this.state = {
      projectNames: [],
      selectedProject: 'D3',
      results: {},
      filteredResults: {},
      filterInput: '',
      openSelections: false,
      openWordCloud: false
    };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    this.fetchProjectNames();
    this.fetchSingleProjectVariables(this.state.selectedProject);
  }

  fetchProjectNames() {
    Api.fetchProjectNames()
      .then((res) => {
        this.setState({
          projectNames: res.data.reduce((res, itm) => {
            if(itm === 'Node')
              return res;
            return res.concat({'value': itm, 'label': itm});
          },[]),
          openSelections: true
        });
      })
      .catch((err) => {
        this.setState({
          openSelections: 'error'
        });
      });
  }

  fetchSingleProjectVariables(selectedProject) {
    Api.fetchSingleProjectVariables(selectedProject)
      .then((res) => {
        this.setState({
          results: Object.assign({}, this.state.results, {[selectedProject]: res.data}),
          filteredResults: res.data,
          openWordCloud: true
        });
      })
      .catch((err) => {
        this.setState({
          results: "error",
          openWordCloud: false
        });
      });
  }

  filterResults(selectedProject, filterInput='') {
    const updatedResults = this.state.results[selectedProject].filter((itm) => {
      return itm.text.includes(filterInput);
    });
    this.setState({
      filteredResults: updatedResults
    }, ()=>{
      setTimeout(() => {
        this.setState({
          openWordCloud: true
        });
      }, 0);
    });
  }

  onSelectChange(selectedProject) {
    this.setState({
      selectedProject: selectedProject.value,
      filterInput: "",
      openWordCloud: false
    });
    const recievedProjects = Object.keys(this.state.results);
    if(recievedProjects.indexOf(selectedProject.value) > -1) {
      this.filterResults(selectedProject.value);
    } else {
      this.fetchSingleProjectVariables(selectedProject.value);
    }
  }

  onFilterChange(event) {
    if(event.key === 'Enter') {
      const newFilterInput = event.target.value.trim();
      if(newFilterInput === '') {
        this.setState({
          filteredResults: this.state.results[this.state.selectedProject],
        });
      } else if(this.state.filterInput !== newFilterInput) {
        this.setState({
          filterInput: newFilterInput,
        });
        this.filterResults(this.state.selectedProject, newFilterInput);
      }
    }
  }

  render() {
    const fontSizeMapper = word => Math.log2(word.value) * 6;
    const rotate = word => Math.random() * 20;
    if(!this.state.openSelections) {
      return(<DoubleBounce size={50} />);
    } else if(this.state.openCheckBox === 'error') {
      return(<div style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    } else {
      return(
        <div id="word-cloud">
          <div id="word-cloud-note"> Node has been excluded in word cloud due to it's large amount of variables. </div>
          <Select
            className="project-select"
            placeholder="Select a JavaScript Project"
            value={this.state.selectedProject}
            options={this.state.projectNames}
            onChange={this.onSelectChange}
            clearable={false}
            deleteRemoves={false}
            backspaceRemoves={false}
          />
          {this.state.openWordCloud ?
            <div>
              <input
                className="filter-word"
                type="text"
                placeholder="filter keyword"
                onKeyDown={this.onFilterChange}
              />
              <WordCloud
                data={this.state.filteredResults}
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

export default WordCloudRender;
