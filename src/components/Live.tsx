import * as React from "react"
import {PlayState} from "../reducer/play.reducer.type";
import {LiveState} from "../reducer/live.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as LiveAction from "action/live.action";
import {connect} from "react-redux";
import Header from "plugin/Header";
import Player from "plugin/Player";

interface StatePropsInterface {
    live?: LiveState,
}

interface DispatchPropsInterface {
    actions?: {
        getRibbonLiveAction: any,
        getDetailLiveAction: any
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
        getDetailLiveAction: LiveAction.getDetailLiveAction
    }, dispatch)
});

class Live extends React.Component<PropsInterface, {}> {

    constructor(props: PropsInterface) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getRibbonLiveAction();
        this.props.actions.getDetailLiveAction();
    }

    renderPlayer () {
        if (typeof this.props.live.data != "undefined") {
            if (typeof this.props.live.data.play_info.data != "undefined") {
                const videoJsOptions = {
                    // autoplay: true,
                    controls: true,
                    sources: [{
                        src: this.props.live.data.play_info.data.hls_link_play,
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
    }

    render() {
        return (
            <div>
                <Header/>
                { this.renderPlayer() }
            </div>
        )
    }

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Live);
