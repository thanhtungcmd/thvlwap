import * as React from "react"
import Home from 'components/Home'
import {
    BrowserRouter, Route, Switch
} from 'react-router-dom'

interface PropInterface {}

const App: React.FunctionComponent<PropInterface> = props => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Home } />
            </Switch>
        </BrowserRouter>
    );

};

export default App
