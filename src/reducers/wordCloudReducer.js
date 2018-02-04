const initState = {
  data: [],
  isLoading: false,
  hasError: false,
  wcShowData: [],
  wcIsLoading: false,
  wcHasError: false,
  wcSavedData: {}
}

export default function reducer(state=initState, action) {
  switch(action.type) {
    case "FETCH_WC_PROJECT_NAMES_PENDING": {
      return {...state, isLoading: true};
    }
    case "FETCH_WC_PROJECT_NAMES_REJECTED": {
      return {...state, isLoading: false, hasError: true};
    }
    case "FETCH_WC_PROJECT_NAMES_FULFILLED": {
      return {...state, isLoading: false, data: action.payload.data};
    }
    case "FETCH_WC_PROJECT_VARIABLES_PENDING": {
      return {...state, wcIsLoading: true}
    }
    case "FETCH_WC_PROJECT_VARIABLES_REJECTED": {
      return {...state, wcIsLoading: false, wcHasError: true}
    }
    case "FETCH_WC_PROJECT_VARIABLES_FULFILLED": {
      return {...state, wcIsLoading: false, wcSavedData: action.savedResults, wcShowData: action.resToBeShowed}
    }
    case "CLEAR_FETCH_WC_PROJECT_VARIABLES_SHOW_RESULTS": {
      return {...state,  wcShowData: [] }
    }
    default: {
      return state;
    }
  }
}
