import { combineReducers } from "redux";
import fetchProjNamesReducer from "./fetchProjNamesReducer";
import fetchProjVarReducer from "./fetchProjVarReducer";
import wordCloudReducer from "./wordCloudReducer";

export default combineReducers({
  fetchProjNamesReducer,
  fetchProjVarReducer,
  wordCloudReducer
})

