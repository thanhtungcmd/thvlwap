import * as React from "react"
import { useEffect } from "react"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import StateInterface from "reducer/index.reducer.type"
import * as MenuAction from "action/menu.action"
import { MenuState } from "reducer/menu.reducer.type"

interface DispatchPropsInterface {
    actions?: {
        getMenuAction: any,
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
        getMenuAction: MenuAction.getMenuAction
    }, dispatch)
});

const Menu: React.FunctionComponent<PropsInterface> = props => {

    useEffect(() => {
        props.actions.getMenuAction();
    }, [])

    const renderMenuView = () => {
        return props.menu.data.map((item, key) => {
            return (
                <li key={key}>
                    <img className="menu-image" alt="menu-image"
                         src={require('asset/img/home-run.png')}/>
                    <a className="pl-3">{item.name}</a>
                </li>
            )
        });
    }

    const renderToggleMenu = () => {
        return (props.menu.show) ? ' d-block' : ' d-none';
    }

    return (
        <div className={"hn-menu-box" + renderToggleMenu()}>
            <ul>
                { renderMenuView() }
            </ul>
        </div>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
