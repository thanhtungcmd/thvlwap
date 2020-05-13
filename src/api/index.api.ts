import axios from "axios"
import { LINK_MENU, LINK_HOME_PAGE } from "config/index"

export const ApiGetMenu = () => {
    return axios.get(LINK_MENU);
}

export const ApiGetHomePage = () => {
    return axios.get(LINK_HOME_PAGE);
}
