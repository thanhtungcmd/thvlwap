import axios from "axios"
import * as link from "config/index"

export const ApiGetMenu = () => {
    return axios.get(link.LINK_MENU);
}

export const ApiGetHomePage = (page: string) => {
    return axios.get(link.LINK_HOME_PAGE + page);
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
    return axios.get(link.LINK_SEASON + id);
}

export const ApiGetRelate = (id: string) => {
    return axios.get(link.LINK_RELATE + id);
}

export const ApiGetEpgLive = (channel: string, date: string) => {
    return axios.get(link.LINK_EPG, {
        params: {
            channel_id: channel,
            schedule_date: date
        }
    })
}

export const ApiInfoUser = (token: string) => {
    return axios.get(link.LINK_PROFILE, {
        headers: {
            "authorization": token
        }
    })
}
