import { MenuState } from "./menu.reducer.type";
import { HomeState } from "./home.reducer.type";

export default interface StateInterface {
    menu: MenuState,
    home: HomeState
}
