const initState = {
  projectNames: [],
  projectNamesIsLoading: false,
  fetchProjectNameHasError: false
}

export default function reducer(state=initState, action) {
  switch(action.type) {
    case "FETCH_PROJECT_NAMES_PENDING": {
      return {...state, projectNamesIsLoading: true};
    }
    case "FETCH_PROJECT_NAMES_REJECTED": {
      return {...state, projectNamesIsLoading: false, fetchProjectNameHasError: true};
    }
    case "FETCH_PROJECT_NAMES_FULFILLED": {
      return {...state, projectNamesIsLoading: false, projectNames: action.payload.data};
    }
    default: {
      return state;
    }
  }
}
