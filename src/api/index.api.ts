import axios from "axios"
import * as link from "config/index"

export const ApiGetMenu = () => {
    return axios.get(link.LINK_MENU);
}

export const ApiGetHomePage = () => {
    return axios.get(link.LINK_HOME_PAGE);
}

export const ApiGetRibbonDetail = (id: string, page: number = 1) => {
    return axios.get(link.LINK_RIBBON_DETAIL + id, {
        params: {
            page: page
        }
    });
}

export const ApiRibbonLoadMore = (id: string, page: number) => {
    return axios.get(link.LINK_RIBBON_DETAIL + id, {
        params: {
            page: page
        }
    });
}

export const ApiGetPlay = (slug: string) => {
    return axios.get(link.LINK_PLAY_DETAIL + slug);
}

export const ApiGetSeason = (id: string) => {
    return axios.get(link.LINK_SEASON + id,);
}
