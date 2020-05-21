import * as React from "react"
import { useEffect } from "react"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import StateInterface from "reducer/index.reducer.type"
import * as MenuAction from "action/menu.action"
import * as AuthAction from "action/auth.action"
import { MenuState } from "reducer/menu.reducer.type"
import { AuthState } from "reducer/auth.reducer.type"
import * as ls from "local-storage";

interface DispatchPropsInterface {
    actions?: {
        getMenuAction: any,
        getInfoAction: any
    }
}

interface StatePropsInterface {
    menu?: MenuState,
    auth?: AuthState
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    menu: state.menu,
    auth: state.auth
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getMenuAction: MenuAction.getMenuAction,
        getInfoAction: AuthAction.getInfoAction
    }, dispatch)
});

const Menu: React.FunctionComponent<PropsInterface> = props => {

    useEffect(() => {
        props.actions.getMenuAction();
        let token = ls.get<string>('token');
        if (typeof token == "string") {
            props.actions.getInfoAction(token);
        }
    }, [])

    const renderMenuView = () => {
        return props.menu.data.map((item, key) => {
            if (item.slug != 'trang-chu') {
                let icon
                let url
                switch (item.slug) {
                    case "truc-tuyen-zua0j":
                        url = '/live/thvl1-hd'
                        icon = (<img alt="icon" style={{top: 19}} src={require("../asset/img/video.png")}/>);
                        break;

                    case "tv-show-2":
                        url = "/trang/" + item.slug
                        icon = (<img alt="icon" style={{top: 14}} src={require("../asset/img/television.png")}/>);
                        break;

                    case "phim-viet-nam":
                        url = "/trang/" + item.slug
                        icon = (<img alt="icon" src={require("../asset/img/film.png")}/>);
                        break;

                    case "phim-nuoc-ngoai":
                        url = "/trang/" + item.slug
                        icon = (<img alt="icon" src={require("../asset/img/film.png")}/>);
                        break;

                    case "thieu-nhi-2":
                        url = "/trang/" + item.slug
                        icon = (<img alt="icon" src={require("../asset/img/kid.png")}/>);
                        break;

                    case "cai-luong":
                        url = "/trang/" + item.slug
                        icon = (<img alt="icon" src={require("../asset/img/cailuong.png")}/>);
                        break;

                    case "ca-nhac-moi":
                        url = "/trang/" + item.slug
                        icon = (<img alt="icon" src={require("../asset/img/music.png")}/>);
                        break;
                }
                return (
                    <li key={key}>
                        <a href={url} className="menu-list-item">
                            {icon}
                            {item.name}
                        </a>
                    </li>
                )
            }
        });
    }

    const renderToggleMenu = () => {
        return (props.menu.show) ? ' active' : '';
    }

    const renderUser = () => {
        let mobifone_sdt = ls.get<string>('mobifone_sdt');
        if (typeof props.auth.profile != "undefined") {
            return (
                <li>
                    <a href="/" className="menu-list-item menu-list-main">
                        <img alt="icon" style={{ width: 40 }} src={ require("../asset/img/icon-avatar.png") }/>
                        {props.auth.profile.first_name}
                    </a>
                </li>
            )
        } else if (typeof mobifone_sdt == "string") {
            return (
                <li>
                    <a href="/" className="menu-list-item menu-list-main">
                        <img alt="icon" style={{ width: 40 }} src={ require("../asset/img/icon-avatar.png") }/>
                        { mobifone_sdt }
                    </a>
                </li>
            )
        } else {
            return (
                <li>
                    <a href="/dang-nhap" className="menu-list-item menu-list-main">
                        <img alt="icon" style={{ width: 40 }} src={ require("../asset/img/icon-avatar.png") }/>
                        Đăng nhập
                    </a>
                </li>
            )
        }
    }


    return (
        <div className={"menu-content" + renderToggleMenu()} style={{ height: window.innerHeight }}>
            <ul className="menu-list">
                { renderUser() }
                <li>
                    <a href="/" className="menu-list-item">
                        <img alt="icon" style={{ top: 14 }} src={ require("../asset/img/home-run.png") }/>
                        Trang chủ
                    </a>
                </li>
                { renderMenuView() }
                <li>
                    <a href="/goi-cuoc" className="menu-list-item menu-list-sub">
                        <img alt="icon" style={{ top: 16 }} src={ require("../asset/img/dangkygoi.png") }/>
                        Đăng ký gói cước
                    </a>
                </li>
                <li>
                    <a href="/" className="menu-list-item">
                        <img alt="icon" style={{ top: 14 }} src={ require("../asset/img/flag.png") }/>
                        Điều khoản dịch vụ
                    </a>
                </li>
            </ul>
        </div>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
