// @ts-ignore
import * as React from "react";
import videojs from 'video.js'
// @ts-ignore
import qualitySelector from 'videojs-hls-quality-selector';
// @ts-ignore
import qualityLevel from 'videojs-contrib-quality-levels';

class Player extends React.Component<{}, {}> {

    private player: videojs.Player;
    private videoNode: any;

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        videojs.registerPlugin('qualityLevel', qualityLevel);
        videojs.registerPlugin('hlsQualitySelector', qualitySelector);

        // @ts-ignore
        this.player = videojs(this.videoNode, this.props);
        // @ts-ignore
        let qualityLevels = this.player.qualityLevels();
        // @ts-ignore
        this.player.hlsQualitySelector({
            displayCurrentQuality: true,
        });
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
                    <video ref={ node => this.videoNode = node } className="video-js vjs-16-9"/>
                </div>
            </div>
        )
    }

}

export default Player
// @ts-ignore
