import App from './components/App';
import store from "./store";
import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

const app = document.getElementById('root');
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, app);
