import axios from "axios";
import {LINK_MENU} from "config/index";

export const ApiGetMenu = () => {
    return axios.get(LINK_MENU);
}
