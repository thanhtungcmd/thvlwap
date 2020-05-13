import * as React from "react"
import * as ReactDOM from "react-dom"
import store from 'store'
import { Provider } from "react-redux"

import App from "components/App"

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './asset/css/style.css'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
