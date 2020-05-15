import {MovieItem} from "./home.reducer.type";

export interface PlayState {
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
    },
    season?: Array<SeasonItem>,
    relate?: Array<MovieItem>,
    tab: number
}

export interface PlayInfo {
    time: number
    data: {
        hls_link_play: string
    }
}

export interface ActorItem {
    role: string,
    name: string
}

export interface SeasonItem {
    id: string,
    title: string,
    views: number,
    favorites: number,
    images: {
        thumbnail: string
    }
}
