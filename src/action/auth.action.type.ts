export const GET_INFO = 'GET_INFO';
export type GET_INFO = typeof GET_INFO;

export const GET_MOBIFONE = 'GET_MOBIFONE';
export type GET_MOBIFONE = typeof GET_MOBIFONE;

export interface GET_INFO_ACTION {
    type: GET_INFO,
    data: any | undefined
}

export interface GET_MOBIFONE_ACTION {
    type: GET_MOBIFONE,
    data: any
}

export type AUTH_ACTION = GET_INFO_ACTION | GET_MOBIFONE_ACTION
