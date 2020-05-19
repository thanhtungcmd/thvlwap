import { MenuState } from "./menu.reducer.type";
import { HomeState } from "./home.reducer.type";
import { RibbonState } from "./ribbon.reducer.type";
import { PlayState } from "./play.reducer.type";
import { LiveState } from "./live.reducer.type";
import { AuthState } from "./auth.reducer.type";

export default interface StateInterface {
    menu: MenuState,
    home: HomeState,
    ribbon: RibbonState,
    play: PlayState,
    live: LiveState
    auth: AuthState
}
