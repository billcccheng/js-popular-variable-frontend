import axios from "axios";

/*LOCAL TESTING USE*/
const hostName = "http://localhost:5000/api";
//const hostName = "https://js-popular-variable-server.herokuapp.com/api"

export function fetchProjectNames() {
  return (dispatch) => {
    const url = `${hostName}/getProjectNames`;
    dispatch({type: "FETCH_PROJECT_NAMES", payload: axios.get(url)});
  }
}

export function fetchWCProjectNames() {
  return (dispatch) => {
    const url = `${hostName}/fetchWordCloudProjectNames`;
    dispatch({type: "FETCH_WC_PROJECT_NAMES", payload: axios.get(url)});
  }
}

export function fetchProjectVariables(selectedProjects, filters, unFetchedProjects=[]) {
  return (dispatch, getState) => {
    const thisState = getState().fetchProjVarReducer;
    const url = `${hostName}/getProjectVariables`;
    dispatch({type: "FETCH_PROJECT_VARIABLES_PENDING"});

    if(unFetchedProjects.length === 0) {
        const filteredResults = filterResults(thisState.results, selectedProjects, filters);
        dispatch({
          type: "FETCH_PROJECT_VARIABLES_FULFILLED",
          filtered: filteredResults,
          results: thisState.results
        });
    } else {
      axios.post(url,{
        selectedProjects: unFetchedProjects
      }).then((res) => {
        const newResults = {...thisState.results, ...res.data}
        const filteredResults = filterResults(newResults, selectedProjects, filters);
        dispatch({
          type: "FETCH_PROJECT_VARIABLES_FULFILLED",
          filtered: filteredResults,
          results: newResults
        });
      }).catch((err) => {
        dispatch({type: "FETCH_PROJECT_VARIABLES_REJECTED"});
      });
    }
  }
}

export function simpleFilter(selectedProjects, filters) {
  return (dispatch, getState) => {
    const thisState = getState().fetchProjVarReducer;
    const results = thisState.results;
    const filteredResults = filterResults(results, selectedProjects, filters);
    dispatch({
      type: "FETCH_PROJECT_VARIABLES_FULFILLED",
      filtered: filteredResults,
      results: results
    });
  }
}

export function fetchWCSingleProjectVariables(selectedProject) {
  return (dispatch, getState) => {
    dispatch({type: "FETCH_WC_PROJECT_VARIABLES_PENDING"});
    const thisState = getState().wordCloudReducer;
    const url = `${hostName}/getSingleProjectVariables/${selectedProject}`;
    axios.get(url).then((res) => {
      dispatch({
        type: "FETCH_WC_PROJECT_VARIABLES_FULFILLED",
        savedResults: {...thisState.wcSavedData, ...{[selectedProject]: res.data}},
        resToBeShowed: res.data
      });
    }).catch((err) => {
      dispatch({
        type: "FETCH_WC_PROJECT_VARIABLES_REJECTED",
      });
    });
  }
}

export function wcSimpleFilter(selectedProject, filter) {
  return (dispatch, getState) => {
    dispatch({type: "FETCH_WC_PROJECT_VARIABLES_PENDING"});
    const savedResults = getState().wordCloudReducer.wcSavedData;
    const updatedResults = savedResults[selectedProject].filter((itm) => {
      return itm.text.includes(filter);
    });
    dispatch({
      type: "FETCH_WC_PROJECT_VARIABLES_FULFILLED",
      resToBeShowed: updatedResults,
      savedResults: savedResults
    });
  }
}

function filterResults(results, selectedProjects, filterInput) {
  const userInput = filterInput.toLowerCase();
  let filteredResults = {};
  selectedProjects.forEach(projectName => {
    projectName = projectName.charAt(0).toLowerCase() + projectName.slice(1);
    filteredResults[projectName] = {};
    if(projectName in results){
      const variableNames = Object.keys(results[projectName]);
      variableNames.filter(variableName => {
        return variableName.toLowerCase().includes(userInput);
      }).map((variableName) => {
        filteredResults[projectName][variableName] = results[projectName][variableName];
        return filteredResults;
      });
    }
  });
  return filteredResults;
}
