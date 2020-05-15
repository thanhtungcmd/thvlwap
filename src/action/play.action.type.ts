export const GET_PLAY = 'GET_PLAY';
export type GET_PLAY = typeof GET_PLAY;

export const GET_SEASON = 'GET_SEASON';
export type GET_SEASON = typeof GET_SEASON;

export interface GET_PLAY_ACTION {
    type: GET_PLAY,
    data: any
}

export interface GET_SEASON_ACTION {
    type: GET_SEASON,
    data: any
}

export type PLAY_ACTION = GET_PLAY_ACTION | GET_SEASON_ACTION
