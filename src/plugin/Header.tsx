import * as React from "react"
import {MenuState} from "../reducer/menu.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "action/menu.action";
import {connect} from "react-redux";
import Menu from "plugin/Menu";

interface DispatchPropsInterface {
    actions?: {
        toggleMenuAction: any
    }
}

interface StatePropsInterface {
    menu?: MenuState
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    menu: state.menu,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        toggleMenuAction: MenuAction.toggleMenuAction
    }, dispatch)
});

const Header: React.FunctionComponent<PropsInterface> = props => {

    const handleToggleMenu = () => {
        props.actions.toggleMenuAction(!props.menu.show)
    }

    const renderLogo = () => {
        if (typeof props.menu.title == "string" && props.menu.title.length > 0) {
            return (
                <div className="image-logo2">
                    { props.menu.title }
                </div>
            )
        }

        return (
            <div className="image-logo2">
                <img src={ require('asset/img/logo.png') } />
            </div>
        )
    }

    return (
        <div className="container-fluid header-1">
            <div className="container">
                <div className="row position-relative header-box">
                    <div className="col-1 header-1-1"
                         onClick={ handleToggleMenu.bind(this) }>
                        <div className="image-back hn-menu">
                            <img src={ require('asset/img/menu.png') } />
                        </div>
                    </div>
                    <div className="col-10 header-1-2">
                        <a href='/'>
                            { renderLogo() }
                        </a>
                    </div>
                    <div className="col-1 header-1-4">
                        <div className="image-back float-right">
                            <img src={ require('asset/img/Search.png') } />
                        </div>
                    </div>
                    <Menu/>
                </div>
            </div>
            <div className="container-fluid header-2 pr-0 pl-0">
                <div className="row position-relative">
                    <img src={ require('asset/img/Rectangle 2.png') }/>
                </div>
            </div>
        </div>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Header);
