export const GET_RIBBON = 'GET_RIBBON';
export type GET_RIBBON = typeof GET_RIBBON;

export interface GET_RIBBON_ACTION {
    type: GET_RIBBON,
    data: any
}

export type RIBBON_ACTION = GET_RIBBON_ACTION
