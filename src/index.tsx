import * as React from "react"
import * as ReactDOM from "react-dom"
import store from 'store'
import { Provider } from "react-redux"

import App from "components/App"

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "video.js/dist/video-js.css"
import './asset/css/style.css'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
