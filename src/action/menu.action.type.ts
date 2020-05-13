export const GET_MENU = 'GET_MENU';
export type GET_MENU = typeof GET_MENU;

export interface GET_MENU_ACTION {
    type: GET_MENU,
    data: any
}

export type MENU_ACTION = GET_MENU_ACTION;
