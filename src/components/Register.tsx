import * as React from "react"
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "action/menu.action";
import {connect} from "react-redux";
import axios from "axios"
import { LINK_REGISTER } from "config/index";
import Header from "plugin/Header";

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
    name: string,
    email: string,
    password: string,
    re_password: string,
    error?: string,
    success: boolean
}

class Register extends React.Component<PropsInterface, CurrentState> {

    constructor(props: PropsInterface) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            re_password: '',
            success: false
        }
    }

    componentDidMount() {
        this.props.actions.changeTitleAction("Đăng ký tài khoản");
    }

    handleInput(type: string, event: any) {
        switch (type) {
            case "name":
                this.setState({
                    name: event.target.value
                });
                break;

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

            case "re_password":
                this.setState({
                    re_password: event.target.value
                });
                break;
        }
    }

    async handleRegister() {
        axios.post(LINK_REGISTER, {
            "email": this.state.email,
            "first_name": this.state.name,
            "last_name": this.state.name,
            "password": this.state.password,
            "dob": "",
            "gender": 0,
            "phone_number": "",
            "g_recaptcha_response": ""
        }).then((result) => {
            this.setState({
                success: true
            })
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

        let renderContent;
        if (this.state.success) {
            renderContent = (
                <div className="card mt-4 register-card">
                    <div className="card-header register-header text-center">
                        Bạn đã đăng ký thành công
                    </div>
                    <div className="card-body register-body text-center">
                        <p className="card-text">
                            Vui lòng bấm đăng nhập<br/>để để tiếp tục truy cập
                        </p>
                        <div className="btn btn-primary mt-3">Đăng nhập</div>
                    </div>
                </div>
            )
        } else {
            renderContent = (
                <div>
                    <div className="form-group mt-3">
                        <input type="text" className="form-control"
                               placeholder="Họ tên"
                               onChange={ this.handleInput.bind(this, 'name') }/>
                    </div>
                    <div className="form-group mt-3">
                        <input type="email" className="form-control"
                               placeholder="Email"
                               onChange={ this.handleInput.bind(this, 'email') }/>
                    </div>
                    <div className="form-group mt-3">
                        <input type="password" className="form-control"
                               placeholder="Mật khẩu"
                               onChange={ this.handleInput.bind(this, 'password') }/>
                    </div>
                    <div className="form-group mt-3">
                        <input type="password" className="form-control"
                               placeholder="Nhập lại mật khẩu"
                               onChange={ this.handleInput.bind(this, 're_password') }/>
                    </div>
                    <div>
                        <button className="btn btn-primary col-12"
                                onClick={ this.handleRegister.bind(this) }>Đăng ký</button>
                    </div>
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
                                { renderContent }
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
)(Register);
