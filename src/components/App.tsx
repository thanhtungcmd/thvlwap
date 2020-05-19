import * as React from "react"
import Home from 'components/Home'
import Ribbon from 'components/Ribbon'
import Play from 'components/Play'
import Live from 'components/Live'
import Login from 'components/Login'
import Register from "components/Register";
import {
    BrowserRouter, Route, Switch
} from 'react-router-dom'

interface PropInterface {}

const App: React.FunctionComponent<PropInterface> = props => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/trang/:id" component={ Home } />
                <Route path="/danh-muc/:id" component={ Ribbon } />
                <Route path="/chi-tiet/:id" component={ Play } />
                <Route path="/live/:id" component={ Live } />
                <Route exact path="/dang-nhap" component={ Login } />
                <Route exact path="/dang-ky" component={ Register } />
            </Switch>
        </BrowserRouter>
    );

};

export default App
