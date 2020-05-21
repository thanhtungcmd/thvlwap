import * as React from "react"
import {RibbonState} from "../reducer/ribbon.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as RibbonAction from "action/ribbon.action";
import * as MenuAction from "action/menu.action";
import {connect} from "react-redux";
import Header from "plugin/Header";

interface StatePropsInterface {
    ribbon?: RibbonState,
}

interface DispatchPropsInterface {
    actions?: {
        getSearchAction: any,
        changeTitleAction: any,
        searchLoadMoreAction: any
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
        getSearchAction: RibbonAction.getSearchAction,
        changeTitleAction: MenuAction.changeTitleAction,
        searchLoadMoreAction: RibbonAction.searchLoadMoreAction
    }, dispatch)
});

class Search extends React.Component<PropsInterface, {}> {

    constructor(props: PropsInterface) {
        super(props);
        this.trackScrolling = this.trackScrolling.bind(this)
    }

    componentDidMount() {
        this.props.actions.getSearchAction(this.props.match.params.id, 1);
        this.props.actions.changeTitleAction("Tìm kiếm");

        // Scroll
        document.addEventListener('scroll', this.trackScrolling, false);
        document.addEventListener('resize', this.trackScrolling, false);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling, false);
        document.removeEventListener('resize', this.trackScrolling, false);
    }

    trackScrolling() {
        const wrappedElement = document.getElementById('container');
        if ((wrappedElement.getBoundingClientRect().bottom - 1) <= window.innerHeight) {
            setTimeout(() => {
                this.props.actions.searchLoadMoreAction(this.props.match.params.id, this.props.ribbon.page + 1)
            }, 1000);
        }
    }

    renderRibbon () {
        if (typeof this.props.ribbon.items != "undefined") {
            let listMovie;
            if (this.props.ribbon.items.length > 0) {
                listMovie = this.props.ribbon.items.map((item, key) => {
                    let viewCount = (item.views > 1000) ? Math.round(item.views/1000) + 'K' : item.views
                    return (
                        <div className="col-12 mb-4" key={key}>
                            <a href={ '/chi-tiet/'+ item.slug }>
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
                            </a>
                        </div>
                    )
                })
            }

            let renderLoading;
            if ( (this.props.ribbon.metadata.page * this.props.ribbon.metadata.limit) < this.props.ribbon.metadata.total ) {
                renderLoading = (
                    <div className="col-12 text-center">
                        <img src={require('asset/img/spinner.gif')} style={{width: 75}}/>
                    </div>
                )
            }

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

    render() {
        return (
            <div id="container">
                <Header/>
                <div className="container-fluid header-6 pt-4 pr-0 pl-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-white">
                                <h3>Từ khóa: { this.props.match.params.id }</h3>
                            </div>
                        </div>
                    </div>
                </div>
                { this.renderRibbon() }
            </div>
        )
    }

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Search);
