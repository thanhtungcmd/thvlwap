export const GET_MENU = 'GET_MENU';
export type GET_MENU = typeof GET_MENU;

export const TOGGLE_MENU = 'TOGGLE_MENU';
export type TOGGLE_MENU = typeof TOGGLE_MENU;

export interface GET_MENU_ACTION {
    type: GET_MENU,
    data: any
}

export interface TOGGLE_MENU_ACTION {
    type: TOGGLE_MENU,
    data: boolean
}

export type MENU_ACTION = GET_MENU_ACTION
    | TOGGLE_MENU_ACTION;
