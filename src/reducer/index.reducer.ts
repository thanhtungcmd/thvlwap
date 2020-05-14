import { combineReducers } from "redux"
import menu from "reducer/menu.reducer"
import home from "reducer/home.reducer"
import ribbon from "reducer/ribbon.reducer"

const rootReducer = combineReducers({
    menu: menu,
    home: home,
    ribbon: ribbon
});

export default rootReducer
