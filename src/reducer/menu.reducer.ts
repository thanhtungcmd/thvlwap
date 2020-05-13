import { MenuState, MenuItem } from "reducer/menu.reducer.type"
import { MENU_ACTION } from "action/menu.action.type";

const initMenu = {
    data: [] as Array<MenuItem>
}

const menuReducer = (state: MenuState = initMenu, action: MENU_ACTION) : MenuState => {
    switch (action.type) {
        case "GET_MENU":
            return {
                ...state,
                data: action.data
            }

        default:
            return state;
    }
}

export default menuReducer
