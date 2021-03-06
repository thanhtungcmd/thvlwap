import { combineReducers } from "redux"
import menu from "reducer/menu.reducer"
import home from "reducer/home.reducer"
import ribbon from "reducer/ribbon.reducer"
import play from "reducer/play.reducer"
import live from "reducer/live.reducer"
import auth from "reducer/auth.reducer"

const rootReducer = combineReducers({
    menu: menu,
    home: home,
    ribbon: ribbon,
    play: play,
    live: live,
    auth: auth
});

export default rootReducer
