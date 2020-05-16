export const GET_RIBBON_LIVE = 'GET_RIBBON_LIVE';
export type GET_RIBBON_LIVE = typeof GET_RIBBON_LIVE;

export const GET_DETAIL_LIVE = 'GET_DETAIL_LIVE';
export type GET_DETAIL_LIVE = typeof GET_DETAIL_LIVE;

export interface GET_RIBBON_LIVE_ACTION {
    type: GET_RIBBON_LIVE,
    data: any
}

export interface GET_DETAIL_LIVE_ACTION {
    type: GET_DETAIL_LIVE,
    data: any
}

export type LIVE_ACTION = GET_RIBBON_LIVE_ACTION | GET_DETAIL_LIVE_ACTION
