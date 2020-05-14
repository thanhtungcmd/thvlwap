import axios from "axios"
import { LINK_MENU, LINK_HOME_PAGE,
    LINK_RIBBON_DETAIL
} from "config/index"

export const ApiGetMenu = () => {
    return axios.get(LINK_MENU);
}

export const ApiGetHomePage = () => {
    return axios.get(LINK_HOME_PAGE);
}

export const ApiGetRibbonDetail = (id: string, page: number = 1) => {
    return axios.get(LINK_RIBBON_DETAIL + id, {
        params: {
            page: page
        }
    });
}
