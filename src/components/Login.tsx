import * as React from "react"
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "action/menu.action";
import {connect} from "react-redux";
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

class Login extends React.Component<PropsInterface, {}> {

    constructor(props: PropsInterface) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.changeTitleAction("Đăng nhập");
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container-fluid header-6 pr-0 pl-0">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-10 offset-1">
                                <div className="text-center">
                                    <img style={{ width: 100 }} alt="logo" src={ require('asset/img/logo.png') } />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="email" className="form-control"
                                           placeholder="Email"/>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="password" className="form-control"
                                           placeholder="Mật khẩu"/>
                                </div>
                                <div>
                                    <button className="btn btn-primary col-12">Đăng nhập</button>
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
