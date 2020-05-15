// @ts-ignore
import * as React from "react";
import videojs from 'video.js'

class Player extends React.Component<{}, {}> {
    private player: videojs.Player;
    private videoNode: any;

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        // instantiate Video.js
        console.log(this.videoNode);
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
            console.log('onPlayerReady', this)
            // this.disablePictureInPicture = true;
        });
        // @ts-ignore
        this.player.disablepictureinpicture = true;
        console.log(this.player);
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <div>
                <div data-vjs-player={true}>
                    <video ref={ node => this.videoNode = node } className="video-js"/>
                </div>
            </div>
        )
    }

}

export default Player
// @ts-ignore
