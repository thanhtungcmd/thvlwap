import * as React from "react"
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "action/menu.action";
import {connect} from "react-redux";
import Header from "plugin/Header";
import axios from "axios";
import {LINK_LOGIN} from "config/index";
import * as ls from "local-storage";

interface DispatchPropsInterface {
    actions?: {
        changeTitleAction: any,
    }
}

interface StatePropsInterface {

}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        changeTitleAction: MenuAction.changeTitleAction,
    }, dispatch)
});

interface CurrentState {
    email: string,
    password: string,
    error?: string
}

class Login extends React.Component<PropsInterface, CurrentState> {

    constructor(props: PropsInterface) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        this.props.actions.changeTitleAction("Đăng nhập");
    }

    handleInput(type: string, event: any) {
        switch (type) {
            case "email":
                this.setState({
                    email: event.target.value
                });
                break;

            case "password":
                this.setState({
                    password: event.target.value
                });
                break;
        }
    }

    handleLogin() {
        axios.post(LINK_LOGIN, {
            "email": this.state.email,
            "password": this.state.password,
        }).then((result: any) => {
            ls.set<string>("token", result.data.access_token);
            alert('Đăng nhập thành công');
            // @ts-ignore
            window.location = '/';
        }).catch((error) => {
            if (typeof error.response.data.detail != "undefined") {
                this.setState({
                    error: error.response.data.detail
                })
            }
        });
    }

    render() {
        let renderError;
        if (typeof this.state.error != "undefined" && this.state.error != '') {
            renderError = (
                <div className="alert alert-danger mb-3" role="alert">
                    { this.state.error }
                </div>
            )
        }

        return (
            <div>
                <Header/>
                <div className="container-fluid header-6 pr-0 pl-0">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-10 offset-1">
                                { renderError }
                                <div className="text-center">
                                    <img style={{ width: 100 }} alt="logo" src={ require('asset/img/logo.png') } />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="email" className="form-control"
                                           placeholder="Email"
                                           onChange={this.handleInput.bind(this,'email')}/>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="password" className="form-control"
                                           placeholder="Mật khẩu"
                                           onChange={this.handleInput.bind(this,'password')}/>
                                </div>
                                <div>
                                    <button className="btn btn-primary col-12"
                                        onClick={ this.handleLogin.bind(this) }>Đăng nhập</button>
                                </div>
                                <div className="mt-4 text-white">
                                    <div className="float-left">Quên mật khẩu</div>
                                    <a href="/dang-ky" className="float-right">Đăng ký tài khoản</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Login);
