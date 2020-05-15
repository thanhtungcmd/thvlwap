import * as React from "react"
import {PlayState} from "../reducer/play.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as PlayAction from "action/play.action";
import {connect} from "react-redux";
import Header from "plugin/Header";
import Player from "plugin/Player";

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
        if (typeof this.props.play.data != "undefined") {
            if (typeof this.props.play.data.default_episode != "undefined") {
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
)(Play);
