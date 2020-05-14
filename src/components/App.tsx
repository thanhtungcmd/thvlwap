import * as React from "react"
import Home from 'components/Home'
import Ribbon from 'components/Ribbon'
import {
    BrowserRouter, Route, Switch
} from 'react-router-dom'

interface PropInterface {}

const App: React.FunctionComponent<PropInterface> = props => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/danh-muc/:id" component={ Ribbon } />
            </Switch>
        </BrowserRouter>
    );

};

export default App
