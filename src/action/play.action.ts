import * as types from 'action/play.action.type'
import { Dispatch } from "redux"
import { ApiGetPlay, ApiGetSeason } from "api/index.api"

export const getPlayAction = (slug: string) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetPlay(slug);
        if (response.status == 200) {
            dispatch(
                getPlaySuccess(response.data)
            )
        }
    }
}

export const getPlaySuccess = (data: any) => {
    return {
        type: types.GET_PLAY,
        data: data
    }
}

export const getSeasonInfoAction = (id: string) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetSeason(id);
        if (response.status == 200) {
            dispatch(
                getSeasonSuccess(response.data)
            )
        }
    }
}

export const getSeasonSuccess = (data: any) => {
    return {
        type: types.GET_SEASON,
        data: data
    }
}
