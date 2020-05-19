export const GET_INFO = 'GET_INFO';
export type GET_INFO = typeof GET_INFO;

export interface GET_INFO_ACTION {
    type: GET_INFO,
    data: any | undefined
}

export type AUTH_ACTION = GET_INFO_ACTION
