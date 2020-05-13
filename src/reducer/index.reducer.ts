import { combineReducers } from "redux"
import menu from "reducer/menu.reducer"
import home from "reducer/home.reducer"

const rootReducer = combineReducers({
    menu: menu,
    home: home
});

export default rootReducer
