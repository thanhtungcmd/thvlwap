export const GET_PLAY = 'GET_PLAY';
export type GET_PLAY = typeof GET_PLAY;

export const GET_SEASON = 'GET_SEASON';
export type GET_SEASON = typeof GET_SEASON;

export const GET_RELATE = 'GET_RELATE';
export type GET_RELATE = typeof GET_RELATE;

export const CHANGE_TAB = 'CHANGE_TAB';
export type CHANGE_TAB = typeof CHANGE_TAB;

export interface GET_PLAY_ACTION {
    type: GET_PLAY,
    data: any
}

export interface GET_SEASON_ACTION {
    type: GET_SEASON,
    data: any
}

export interface GET_RELATE_ACTION {
    type: GET_RELATE,
    data: any
}

export interface CHANGE_TAB_ACTION {
    type: CHANGE_TAB,
    data: number
}

export type PLAY_ACTION = GET_PLAY_ACTION |
    GET_SEASON_ACTION |
    GET_RELATE_ACTION |
    CHANGE_TAB_ACTION
