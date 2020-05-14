export const GET_RIBBON = 'GET_RIBBON';
export type GET_RIBBON = typeof GET_RIBBON;

export const RIBBON_LOAD_MORE = 'RIBBON_LOAD_MORE';
export type RIBBON_LOAD_MORE = typeof RIBBON_LOAD_MORE;

export interface GET_RIBBON_ACTION {
    type: GET_RIBBON,
    data: any
}

export interface RIBBON_LOAD_MORE_ACTION {
    type: RIBBON_LOAD_MORE,
    data: any,
    page: number
}

export type RIBBON_ACTION = GET_RIBBON_ACTION |
    RIBBON_LOAD_MORE_ACTION
