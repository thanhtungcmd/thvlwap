import * as React from "react"
import Home from 'components/Home'
import Ribbon from 'components/Ribbon'
import Play from 'components/Play'
import Live from 'components/Live'
import Login from 'components/Login'
import Register from "components/Register";
import Package from "components/Package";
import Search from "components/Search";
import {
    BrowserRouter, Route, Switch
} from 'react-router-dom'
import {useEffect, useState} from "react";
import * as ls from "local-storage";
import axios from "axios"
import {MOBIFONE_PACKAGE, MOBIFONE_PATH, MOBIFONE_TOKEN} from "config/index";

interface PropInterface {}

const App: React.FunctionComponent<PropInterface> = props => {

    const [loadingDone, setLoadingDone] = useState(false);

    // @ts-ignore
    useEffect(() => {
        const loadTokenMobi = () => {
            let mobifone_token = ls.get<string>('mobifone_token');
            if (typeof mobifone_token != "string") {
                axios.post(MOBIFONE_TOKEN).then((res) => {
                    ls.set<string>('mobifone_token', res.data.access_token)
                    loadMsisdn()
                });
            } else {
                loadMsisdn()
            }
        }

        const loadMsisdn = () => {
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
                } else {
                    setLoadingDone(true);

                    if (link != '') {
                        axios.get(MOBIFONE_PATH + "/service/ecbdecode", {
                            params: {
                                'data': link,
                            }
                        }).then((res) => {
                            if (res.data != '') {
                                ls.set<string>('mobifone_sdt', res.data.toString());
                                loadPackage()
                                setLoadingDone(true);
                            }
                        })
                    }
                }
            } else {
                loadPackage()
                setLoadingDone(true);
            }
        }

        const loadPackage = () => {
            let mobifone_sdt = ls.get<string>('mobifone_sdt');
            let mobifone_token = ls.get<string>('mobifone_token');

            if (typeof mobifone_token == "string" && typeof mobifone_sdt == "string") {
                axios.post(MOBIFONE_PACKAGE, {
                    msisdn: mobifone_sdt,
                    token: mobifone_token
                }).then((res) => {
                    console.log(res.data.package[0].service_code);
                    ls.set<string>('mobifone_package', res.data.package[0].service_code);
                }).catch(() => {
                    ls.remove('mobifone_sdt');
                    ls.remove('mobifone_token');
                    // @ts-ignore
                    window.location = '/';
                })
            }
        }

        loadTokenMobi();
    }, []);

    const render = () => {
        if (loadingDone) {
            return (
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/trang/:id" component={Home}/>
                    <Route path="/danh-muc/:id" component={Ribbon}/>
                    <Route path="/chi-tiet/:id" component={Play}/>
                    <Route path="/live/:id" component={Live}/>
                    <Route exact path="/dang-nhap" component={Login}/>
                    <Route exact path="/dang-ky" component={Register}/>
                    <Route exact path="/goi-cuoc" component={Package}/>
                    <Route path="/tim-kiem/:id" component={Search}/>
                </Switch>
            )
        }
    }

    return (
        <BrowserRouter>
            { render() }
        </BrowserRouter>
    );

};

export default App
