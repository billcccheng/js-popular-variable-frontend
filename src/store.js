import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import reducer from "./reducers";

// Remember to delete CreateLogger when deploying
const middleware = applyMiddleware(promiseMiddleware(), thunk, logger);

export default createStore(reducer, middleware);

