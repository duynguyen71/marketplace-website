import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from "@chakra-ui/react";
import { Router} from "react-router-dom";
import {createStore} from "redux";
import allReducers from "./reducers";
import {Provider} from 'react-redux';
import history from './helper/history';

//STORE
export const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//ACTION

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
                <Router history={history}>
                    <ChakraProvider>
                        <App/>
                    </ChakraProvider>
                </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
