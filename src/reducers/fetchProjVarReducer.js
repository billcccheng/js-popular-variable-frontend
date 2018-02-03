const initState = {
  results: {},
  filteredResults: {},
  isLoading: false,
  hasError: false
}

export default function reducer(state=initState, action) {
  switch(action.type) {
    case "FETCH_PROJECT_VARIABLES_PENDING": {
      return {...state, isLoading: true};
    }
    case "FETCH_PROJECT_VARIABLES_REJECTED": {
      return {...state, isLoading: false, hasError: true};
    }
    case "FETCH_PROJECT_VARIABLES_FULFILLED": {
      return {...state, isLoading: false, filteredResults: action.filtered, results: action.results};
    }
    default: {
      return state;
    }
  }
}
