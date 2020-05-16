import {MovieItem} from "./home.reducer.type";
import {ActorItem, PlayInfo} from "./play.reducer.type";

export interface LiveState {
    ribbon?: Array<MovieItem>,
    data?: {
        id?: string,
        group?: string,
        type?: number,
        title?: string,
        short_description?: string,
        people?: Array<ActorItem>,
        release_date?: string,
        favorites?: number,
        views?: number,
        play_info?: PlayInfo
        images?: {
            thumbnail: string
        },
        default_episode?: {
            id: string,
            title: string,
            group: string,
            images: {
                thumbnail: string
            },
            play_info?: PlayInfo
        }
    }
}
