import * as React from "react"
import Home from 'components/Home'
import Ribbon from 'components/Ribbon'
import Play from 'components/Play'
import Live from 'components/Live'
import Login from 'components/Login'
import Register from "components/Register";
import Package from "components/Package";
import {
    BrowserRouter, Route, Switch
} from 'react-router-dom'
import {useEffect} from "react";
import * as ls from "local-storage";
import axios from "axios"
import {MOBIFONE_PATH} from "config/index";

interface PropInterface {}

const App: React.FunctionComponent<PropInterface> = props => {

    // @ts-ignore
    useEffect(() => {
        const loadMobi = async () => {
            let mobifone_sdt = ls.get<string>('mobifone_sdt');
            if (typeof mobifone_sdt != "string") {
                let url_string = window.location.href;
                let url = new URL(url_string);
                let link = url.searchParams.get("link");

                if (link == null) {
                    axios.get(MOBIFONE_PATH + "/service/ecbdecrypt", {
                        params: {
                            'data': window.location.href
                        }
                    }).then((res) => {
                        // @ts-ignore
                        window.location = 'http://free.mobifone.vn/isdn?sp=9355&link=' + res.data;
                    })
                } else if (link == '') {
                    axios.get(MOBIFONE_PATH + "/service/ecbdecode", {
                        params: {
                            'data': link,
                        }
                    }).then((res) => {
                        if (res.data != '') {
                            ls.set<string>('mobifone_sdt', res.data)
                        }
                    })
                }
            }
        }

        loadMobi();
    }, []);

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
                <Route exact path="/goi-cuoc" component={ Package } />
            </Switch>
        </BrowserRouter>
    );

};

export default App
