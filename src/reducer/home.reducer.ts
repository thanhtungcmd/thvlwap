import { HomeState, RibbonItem, BannerItem } from "reducer/home.reducer.type"
import { HOME_ACTION } from "action/home.action.type";

const initMenu = {
    banner: [] as Array<BannerItem>,
    ribbon: [] as Array<RibbonItem>
}

const homeReducer = (state: HomeState = initMenu, action: HOME_ACTION): HomeState => {
    switch (action.type) {
        case "GET_HOME":
            return {
                ...state,
                banner: action.data.banners,
                ribbon: action.data.ribbons
            };

        default:
            return state;
    }
}

export default homeReducer
