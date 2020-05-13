import { combineReducers } from "redux"
import menu from "reducer/menu.reducer"

const rootReducer = combineReducers({
    menu: menu
});

export default rootReducer
