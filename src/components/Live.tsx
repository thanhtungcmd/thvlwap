import * as React from "react"
import {PlayState} from "../reducer/play.reducer.type";
import {LiveState} from "../reducer/live.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as LiveAction from "action/live.action";
import {connect} from "react-redux";
import Header from "plugin/Header";
import Player from "plugin/Player";
import Slider from "react-slick";
import * as moment from "moment";
import videojs from "video.js";

interface StatePropsInterface {
    live?: LiveState,
}

interface DispatchPropsInterface {
    actions?: {
        getRibbonLiveAction: any,
        getDetailLiveAction: any,
        getEpgLiveAction: any
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
    live: state.live,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getRibbonLiveAction: LiveAction.getRibbonLiveAction,
        getDetailLiveAction: LiveAction.getDetailLiveAction,
        getEpgLiveAction: LiveAction.getEpgLiveAction
    }, dispatch)
});

interface CurrentState {
    live: string,
    update_detect: boolean,
}

class Live extends React.Component<PropsInterface, CurrentState> {

    constructor(props: PropsInterface) {
        super(props);
        this.state = {
            live: null,
            update_detect: false
        }
    }

    componentDidMount() {
        this.props.actions.getDetailLiveAction(this.props.match.params.id);
    }

    componentDidUpdate(prevProps: Readonly<PropsInterface>) {
        if (typeof this.props.live.data != "undefined" && this.state.live == null) {
            this.setState({
                live: this.props.live.data.play_info.data.hls_link_play
            })
        }
        if (typeof this.props.live.ribbon == "undefined" && typeof this.props.live.data != "undefined") {
            this.props.actions.getRibbonLiveAction();
        }
        if (typeof this.props.live.epg == "undefined" && typeof this.props.live.data != "undefined"
            && typeof this.props.live.ribbon != "undefined") {
            this.props.actions.getEpgLiveAction(this.props.live.data.id, moment().format('YYYY-MM-DD'))
        }
        if (typeof this.props.live.epg != "undefined") {
            let currentChannel = document.getElementById("live-active");
            currentChannel.scrollIntoView();
        }
    }

    handleChannel(channel: any) {
        this.setState({
            live: channel,
            update_detect: true
        });
    }

    renderPlayer () {
        if (typeof this.props.live.data != "undefined") {
            if (typeof this.props.live.data.play_info.data != "undefined" && this.state.live != null) {
                console.log(123);
                const videoJsOptions = {
                    autoplay: true,
                    controls: true,
                    sources: [{
                        src: this.state.live,
                        type: 'application/x-mpegURL'
                    }],
                    controlBar: {
                        pictureInPictureToggle: false
                    },
                    update_detect: this.state.update_detect
                }

                return (
                    <div className="container-fluid header-6 pr-0 pl-0 overflow-hidden">
                        <div className="container pr-0 pl-0">
                            <div className="row">
                                <div className="col-12">
                                    <Player {...videoJsOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    renderChannel() {
        if (typeof this.props.live.ribbon != "undefined") {
            let settings = {
                dots: false,
                arrows: true,
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1
            };

            let listBanner = this.props.live.ribbon.map((item, key) => {
                return (
                    <div className="pl-2 pr-2" key={key}>
                        <a href={'/live/' + item.slug}>
                            <img src={item.images.thumbnail} alt={item.slug}/>
                        </a>
                    </div>
                );
            })

            return (
                <div className="container-fluid header-3 pr-0 pl-0 overflow-hidden">
                    <div className="container pr-0 pl-0">
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Slider className="live-slider" {...settings}>
                                    {listBanner}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderEpg() {
        return (
            <div className="container-fluid header-6 pr-0 pl-0 text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-3 mb-3">
                            <div className="font-weight-bold">Lịch phát sóng</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderEpgList() {
        if (typeof this.props.live.epg != "undefined") {
            let listMovie;
            if (this.props.live.epg.length > 0) {
                let currentTime: number = parseInt(moment().format('X'));
                listMovie = this.props.live.epg.map((item, key) => {
                    if (currentTime >= item.start_at && currentTime <= item.end_at) {
                        return (
                            <div id="live-active" className="col-12 mb-4" key={key}>
                                <div onClick={ this.handleChannel.bind(this, item.link_play) }>
                                    <div className="row">
                                        <div className="col-4 pr-0">
                                            {
                                                (item.images.thumbnail != '')
                                                    ? (<img src={item.images.thumbnail} alt={item.title}/>)
                                                    : (<img src={this.props.live.data.images.thumbnail} alt={item.title}/>)
                                            }
                                        </div>
                                        <div className="col-8 position-relative">
                                            <div className="text-title">{item.title}</div>
                                            <div className="text-sub mt-1">{ moment.unix(item.start_at).format("HH:mm") }</div>
                                            <div className="live-icon">
                                                <img src={ require('asset/img/icon-live.png') } />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="col-12 mb-4" key={key}>
                                <div onClick={ this.handleChannel.bind(this, item.link_play) }>
                                    <div className="row">
                                        <div className="col-4 pr-0">
                                            {
                                                (item.images.thumbnail != '')
                                                    ? (<img src={item.images.thumbnail} alt={item.title}/>)
                                                    : (<img src={this.props.live.data.images.thumbnail} alt={item.title}/>)
                                            }
                                        </div>
                                        <div className="col-8">
                                            <div className="text-title">{item.title}</div>
                                            <div className="text-sub mt-1">{ moment.unix(item.start_at).format("HH:mm") }</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }

            const height = document.getElementById('live-fix').clientHeight;

            return (
                <div className="container-fluid pr-0 pl-0 text-white" style={{
                    marginTop: height,
                    height: window.innerHeight - height,
                    overflow: "scroll"
                }}>
                    <div className="container">
                        <div>
                            <div className="row">
                                {listMovie}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div id="live-fix" className="live-fix">
                    <Header/>
                    { this.renderPlayer() }
                    { this.renderChannel() }
                    { this.renderEpg() }
                </div>
                { this.renderEpgList() }
            </div>
        )
    }

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Live);
