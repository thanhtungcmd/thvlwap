export const GET_HOME = 'GET_HOME';
export type GET_HOME = typeof GET_HOME;

export interface GET_HOME_ACTION {
    type: GET_HOME,
    data: any
}

export type HOME_ACTION = GET_HOME_ACTION
