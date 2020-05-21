import * as React from "react"
import {MenuState} from "../reducer/menu.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "action/menu.action";
import {connect} from "react-redux";
import Menu from "plugin/Menu";
import {useEffect, useRef, useState} from "react";

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

    const inputSearch = useRef(null);
    const [search, setSearch] = useState(false);
    const [input, setInput] = useState('');

    const handleToggleMenu = () => {
        props.actions.toggleMenuAction(!props.menu.show)
    }

    const handleToggleSearch = () => {
        setSearch(!search);
        setTimeout(() => {
            inputSearch.current.focus();
        }, 100);
    }

    const handleSearchInput = (e: any) => {
        setInput(e.target.value);
    }

    const handleSearchKey = (e: any) => {
        if(e.key === 'Enter'){
            // @ts-ignore
            window.location = "/tim-kiem/"+ changeToSlug(input)
        }
    }

    const changeToSlug = (data: string) => {
        let title, slug;

        //Lấy text từ thẻ input title
        title = data;

        //Đổi chữ hoa thành chữ thường
        slug = title.toLowerCase();

        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        // slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, ' ');
        slug = slug.replace(/\-\-\-\-/gi, ' ');
        slug = slug.replace(/\-\-\-/gi, ' ');
        slug = slug.replace(/\-\-/gi, ' ');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        //In slug ra textbox có id “slug”
        return slug;
    }

    const renderLogo = () => {
        if (typeof props.menu.title == "string" && props.menu.title.length > 0) {
            return (
                <div className="logo2-title">
                    { props.menu.title }
                </div>
            )
        }

        return (
            <div className="image-logo2">
                <img alt="logo" src={ require('asset/img/logo.png') } />
            </div>
        )
    }

    const renderMenuOverLay = () => {
        return (props.menu.show) ?
            (<div className="menu-overlay" style={{ height: window.innerHeight }}
                onClick={ handleToggleMenu }/>)
            : '';
    }

    return (
        <div className="container-fluid header-1 position-relative">
            <div className="container">
                <div className="row position-relative header-box">
                    <div className="col-1 header-1-1"
                         onClick={ handleToggleMenu }>
                        <div className="image-back hn-menu">
                            <img src={ require('asset/img/menu.png') } />
                        </div>
                    </div>
                    <div className="col-10 header-1-2">
                        <a href='/'>
                            { renderLogo() }
                        </a>
                    </div>
                    <div className="col-1 header-1-4"
                        onClick={ handleToggleSearch }>
                        <div className="image-back float-right">
                            <img src={ require('asset/img/Search.png') } />
                        </div>
                    </div>
                    { renderMenuOverLay() }
                    <Menu/>
                </div>
            </div>
            <div className="container-fluid header-2 pr-0 pl-0">
                <div className="row position-relative">
                    <img src={ require('asset/img/Rectangle 2.png') }/>
                </div>
            </div>
            <div className={"search-box" + ((search) ? ' d-inline' : '') }>
                <input ref={inputSearch} type="text" className="form-control"
                    onChange={ handleSearchInput.bind(this) }
                    onKeyPress={ handleSearchKey.bind(this) }/>
            </div>
        </div>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Header);
