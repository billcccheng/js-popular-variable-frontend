import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import App from './components/App';
import store from "./store";

const app = document.getElementById('root');
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, app);
