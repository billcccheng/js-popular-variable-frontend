import { combineReducers } from "redux";
import fetchProjNamesReducer from "./fetchProjNamesReducer";
import wordCloudReducer from "./wordCloudReducer";

export default combineReducers({
  fetchProjNamesReducer,
  wordCloudReducer
})

