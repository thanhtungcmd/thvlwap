import * as React from "react"
import Header from "plugin/Header";
import StateInterface from "reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as RibbonAction from "action/ribbon.action";
import * as MenuAction from "action/menu.action";
import {connect} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {RibbonState} from "reducer/ribbon.reducer.type";

interface StatePropsInterface {
    ribbon?: RibbonState,
}

interface DispatchPropsInterface {
    actions?: {
        getRibbonDetailAction: any,
        changeTitleAction: any,
        ribbonLoadMoreAction: any
    }
}

interface ParamPropsInterface {
    match: {
        params: {
            id: string
        }
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface & ParamPropsInterface;

const mapStateToProps = (state: StateInterface) => ({
    ribbon: state.ribbon,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getRibbonDetailAction: RibbonAction.getRibbonDetailAction,
        changeTitleAction: MenuAction.changeTitleAction,
        ribbonLoadMoreAction: RibbonAction.ribbonLoadMoreAction
    }, dispatch)
});

const Ribbon: React.FunctionComponent<PropsInterface> = props => {

    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        props.actions.getRibbonDetailAction(props.match.params.id, 1);
    }, [])

    useEffect(() => {
        if (typeof props.ribbon.page != "undefined") {
            document.addEventListener('scroll', trackScrolling, true);
            document.addEventListener('resize', trackScrolling, true);
        }
    }, [props.ribbon])

    useEffect(() => {
        setShowLoading(false);
    }, [props.ribbon.items])

    useEffect(() => {
        if (typeof props.ribbon.name != "undefined") {
            props.actions.changeTitleAction(props.ribbon.name);
        }
    }, [props.ribbon.name]);

    const trackScrolling = useCallback( () => {
        const wrappedElement = document.getElementById('container');
        if ((wrappedElement.getBoundingClientRect().bottom - 1) <= window.innerHeight) {
            if (!showLoading) {
                setShowLoading(true);
                setPage(page + 1)
                console.log(page);
                setTimeout(() => {
                    // props.actions.ribbonLoadMoreAction(props.match.params.id, page + 1)
                    testData(page + 1);
                }, 2000)
            }
        }
    }, [page])

    const testData = (page: number) => {
        props.actions.ribbonLoadMoreAction(props.match.params.id, page)
        console.log(page);
    }

    const renderRibbon = () => {
        if (typeof props.ribbon.items != "undefined") {
            let listMovie;
            if (props.ribbon.items.length > 0) {
                listMovie = props.ribbon.items.map((item, key) => {
                    let viewCount = (item.views > 1000) ? Math.round(item.views/1000) + 'K' : item.views
                    return (
                        <div className="col-12 mb-4" key={key}>
                            <div className="row">
                                <div className="col-5 pr-0">
                                    <img src={item.images.thumbnail} alt={item.title}/>
                                </div>
                                <div className="col-7">
                                    <div className="text-title">{ item.title }</div>
                                    <div className="text-sub mt-1">{ item.short_description }</div>
                                    <div className="row position-relative mt-2">
                                        <div className="col-6 div-left movie-view">
                                            <img className="phim-image" src={require('asset/img/vector.png')}/>
                                            <span className="phim-mota">{ viewCount } lượt xem</span>
                                        </div>
                                        <div className="col-6 div-left movie-like">
                                            <img className="phim-image" src={require('asset/img/heart.png')}/>
                                            <span className="phim-mota">{ item.favorites } yêu thích</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            let renderLoading;
            renderLoading = (
                <div className="col-12 text-center">
                    <img src={ require('asset/img/spinner.gif') } style={{ width: 75 }} />
                </div>
            )

            return (
                <div className="container-fluid header-4 pt-4 pr-0 pl-0">
                    <div className="container">
                        <div className="row">
                            {listMovie}
                            {renderLoading}
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div id="container">
            <Header/>
            { renderRibbon() }
        </div>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Ribbon);
