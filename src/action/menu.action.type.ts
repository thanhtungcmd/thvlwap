export const GET_MENU = 'GET_MENU';
export type GET_MENU = typeof GET_MENU;

export const TOGGLE_MENU = 'TOGGLE_MENU';
export type TOGGLE_MENU = typeof TOGGLE_MENU;

export const CHANGE_TITLE = 'CHANGE_TITLE';
export type CHANGE_TITLE = typeof CHANGE_TITLE;

export interface GET_MENU_ACTION {
    type: GET_MENU,
    data: any
}

export interface TOGGLE_MENU_ACTION {
    type: TOGGLE_MENU,
    data: boolean
}

export interface CHANGE_TITLE_ACTION {
    type: CHANGE_TITLE,
    data: string
}

export type MENU_ACTION = GET_MENU_ACTION
    | TOGGLE_MENU_ACTION
    | CHANGE_TITLE_ACTION;
