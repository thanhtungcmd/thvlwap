import { MenuState } from "./menu.reducer.type";
import { HomeState } from "./home.reducer.type";
import { RibbonState } from "./ribbon.reducer.type";
import { PlayState } from "./play.reducer.type";

export default interface StateInterface {
    menu: MenuState,
    home: HomeState,
    ribbon: RibbonState,
    play: PlayState
}
