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

interface StatePropsInterface {
    play?: PlayState,
}

interface DispatchPropsInterface {
    actions?: {
        getSeasonInfoAction: any,
        getPlayAction: any,
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
    }, dispatch)
});

class Play extends React.Component<PropsInterface, {}> {

    constructor(props: PropsInterface) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getPlayAction(this.props.match.params.id);
    }

    renderPlayer () {
        let dataRender;
        if (typeof this.props.play.data != "undefined") {
            if (this.props.play.data.type == TYPE_SHOW) {
                dataRender = this.renderTypeShow();
            } else if (this.props.play.data.type == TYPE_MOVIE) {
                dataRender = this.renderTypeMovie();
            }
        }

        return dataRender;
    }

    renderTypeShow() {
        if (typeof this.props.play.data.default_episode.play_info != "undefined") {
            const videoJsOptions = {
                // autoplay: true,
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
                <div className="container-fluid pr-0 pl-0">
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
                // autoplay: true,
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
                <div className="container-fluid pr-0 pl-0">
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

    render() {
        return (
            <div>
                <Header/>
                { this.renderPlayer() }
                { this.renderInfo() }
            </div>
        )
    }

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Play);
