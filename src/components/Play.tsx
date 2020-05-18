import * as React from "react"
import {PlayState} from "../reducer/play.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as PlayAction from "action/play.action";
import {connect} from "react-redux";
import Header from "plugin/Header";
import Player from "plugin/Player";

const TYPE_MOVIE = 1;
const TYPE_SHOW = 2;
const TYPE_EPISODE = 4;

interface StatePropsInterface {
    play?: PlayState,
}

interface DispatchPropsInterface {
    actions?: {
        getSeasonInfoAction: any,
        getPlayAction: any,
        getRelateAction: any,
        changeTabAction: any
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
    play: state.play,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getPlayAction: PlayAction.getPlayAction,
        getSeasonInfoAction: PlayAction.getSeasonInfoAction,
        getRelateAction: PlayAction.getRelateAction,
        changeTabAction: PlayAction.changeTabAction
    }, dispatch)
});

class Play extends React.Component<PropsInterface, {}> {

    constructor(props: PropsInterface) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getPlayAction(this.props.match.params.id);
    }

    componentDidUpdate(prevProps: Readonly<PropsInterface>) {
        // Get Season
        if (typeof this.props.play.season == "undefined") {
            if (this.props.play.data.type == TYPE_EPISODE) {
                this.props.actions.getSeasonInfoAction(this.props.play.data.group);
            } else if (this.props.play.data.type == TYPE_SHOW) {
                this.props.actions.getSeasonInfoAction(this.props.play.data.default_episode.group);
            }
        }

        // Get Relate
        if (typeof this.props.play.relate == "undefined") {
            this.props.actions.getRelateAction(this.props.play.data.id)
        }
    }

    handleChangeTab(tab: number) {
        this.props.actions.changeTabAction(tab);
    }

    renderPlayer () {
        let dataRender;
        if (typeof this.props.play.data != "undefined") {
            if (this.props.play.data.type == TYPE_SHOW) {
                dataRender = this.renderTypeShow();
            } else if (this.props.play.data.type == TYPE_MOVIE || this.props.play.data.type == TYPE_EPISODE) {
                dataRender = this.renderTypeMovie();
            }
        }

        return dataRender;
    }

    renderTypeShow() {
        if (typeof this.props.play.data.default_episode.play_info != "undefined") {
            const videoJsOptions = {
                autoplay: true,
                controls: true,
                sources: [{
                    src: this.props.play.data.default_episode.play_info.data.hls_link_play,
                    type: 'application/x-mpegURL'
                }],
                controlBar: {
                    pictureInPictureToggle: false
                }
            }

            return (
                <div className="container-fluid header-6 pr-0 pl-0 overflow-hidden">
                    <div className="container pr-0 pl-0">
                        <div className="row">
                            <div className="col-12">
                                <Player {...videoJsOptions}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderTypeMovie () {
        if (typeof this.props.play.data.play_info.data != "undefined") {
            const videoJsOptions = {
                autoplay: true,
                controls: true,
                sources: [{
                    src: this.props.play.data.play_info.data.hls_link_play,
                    type: 'application/x-mpegURL'
                }],
                controlBar: {
                    pictureInPictureToggle: false
                }
            }

            return (
                <div className="container-fluid header-6 pr-0 pl-0 overflow-hidden">
                    <div className="container pr-0 pl-0">
                        <div className="row">
                            <div className="col-12">
                                <Player {...videoJsOptions}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderInfo () {
        if (typeof this.props.play.data != "undefined") {
            let viewCount = (this.props.play.data.views > 1000) ?
                Math.round(this.props.play.data.views / 1000) + 'K' :
                this.props.play.data.views;

            return (
                <div className="container-fluid header-6 pr-0 pl-0">
                    <div className="container pt-3 pb-3">
                        <div className="row">
                            <div className="col-5 pr-0">
                                <img src={ this.props.play.data.images.thumbnail } alt={this.props.play.data.title}/>
                            </div>
                            <div className="col-7">
                                <div className="text-title">{ this.props.play.data.title }</div>
                                <div className="text-sub mt-1">{ this.props.play.data.short_description }</div>
                                <div className="row position-relative mt-2">
                                    <div className="col-6 div-left movie-view">
                                        <img className="phim-image" src={require('asset/img/vector.png')}/>
                                        <span className="phim-mota">{ viewCount } lượt xem</span>
                                    </div>
                                    <div className="col-6 div-left movie-like">
                                        <img className="phim-image" src={require('asset/img/heart.png')}/>
                                        <span className="phim-mota">{ this.props.play.data.favorites } yêu thích</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderTab() {
        if (typeof this.props.play.data != "undefined") {
            return (
                <div className="container-fluid header-6 pr-0 pl-0 color-white">
                    <div className="container pr-0 pl-0">
                        <nav className="nav nav-pills nav-fill play-nav">
                            <div className={"nav-item nav-link" + ((this.props.play.tab == 1) ? ' active' : '') }
                                onClick={ this.handleChangeTab.bind(this, 1) }>Thông tin</div>
                            <div className={"nav-item nav-link" + ((this.props.play.tab == 2) ? ' active' : '') }
                                 onClick={ this.handleChangeTab.bind(this, 2) }>Trọn bộ</div>
                            <div className={"nav-item nav-link" + ((this.props.play.tab == 3) ? ' active' : '') }
                                 onClick={ this.handleChangeTab.bind(this, 3) }>Liên quan</div>
                            <div className={"nav-item nav-link" + ((this.props.play.tab == 4) ? ' active' : '') }
                                 onClick={ this.handleChangeTab.bind(this, 4) }>Bình luận</div>
                        </nav>
                        <div className="tab-content">
                            { this.renderTabInfo() }
                            { this.renderTabEpisode() }
                            { this.renderTabRelate() }
                            <div className="tab-pane fade">...</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderTabRelate() {
        let listMovie;
        if (typeof this.props.play.relate != "undefined") {
            listMovie = this.props.play.relate.map((item, key) => {
                let viewCount = (item.views > 1000) ? Math.round(item.views / 1000) + 'K' : item.views
                return (
                    <div className="col-12 mb-4" key={key}>
                        <a href={'/chi-tiet/' + item.id}>
                            <div className="row">
                                <div className="col-5 pr-0">
                                    <img src={item.images.thumbnail} alt={item.title}/>
                                </div>
                                <div className="col-7">
                                    <div className="text-title">{item.title}</div>
                                    <div className="row position-relative mt-2">
                                        <div className="col-6 div-left movie-view">
                                            <img className="phim-image" src={require('asset/img/vector.png')}/>
                                            <span className="phim-mota">{viewCount} lượt xem</span>
                                        </div>
                                        <div className="col-6 div-left movie-like">
                                            <img className="phim-image" src={require('asset/img/heart.png')}/>
                                            <span className="phim-mota">{item.favorites} yêu thích</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            })
        }

        return (
            <div className={"tab-pane fade" + ((this.props.play.tab == 3) ? " show active" : '')}>
                <div className="container header-6">
                    <div className="row pt-3">
                        { listMovie }
                    </div>
                </div>
            </div>
        )
    }

    renderTabEpisode() {
        let listMovie;
        if (typeof this.props.play.season != "undefined") {
            listMovie = this.props.play.season.map((item, key) => {
                let viewCount = (item.views > 1000) ? Math.round(item.views/1000) + 'K' : item.views
                return (
                    <div className="col-12 mb-4" key={key}>
                        <a href={ '/chi-tiet/'+ item.id }>
                            <div className="row">
                                <div className="col-5 pr-0">
                                    <img src={item.images.thumbnail} alt={item.title}/>
                                </div>
                                <div className="col-7">
                                    <div className="text-title">{ item.title }</div>
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

        return (
            <div className={"tab-pane fade" + ((this.props.play.tab == 2) ? " show active" : '')}>
                <div className="container header-6">
                    <div className="row pt-3">
                        { listMovie }
                    </div>
                </div>
            </div>
        )
    }

    renderTabInfo() {
        return (
            <div className={"tab-pane fade" + ((this.props.play.tab == 1) ? " show active" : '')}>
                <div className="container header-6">
                    <div className="row">
                        <div className="col-12 pb-5">
                            <div className="play-title mt-3 mb-2">{this.props.play.data.title}</div>
                            <div className="play-sub mb-2">{this.props.play.data.short_description}</div>
                            <div className="play-sub mt-3">
                                - Diễn viên:&nbsp;
                                { this.props.play.data.people.map((item) => {
                                    return item.name + ',';
                                }) }
                            </div>
                            <div className="play-sub mt-3">
                                - Ngày sản xuất: { this.props.play.data.release_date }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header/>
                { this.renderPlayer() }
                { this.renderInfo() }
                { this.renderTab() }
            </div>
        )
    }

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Play);
