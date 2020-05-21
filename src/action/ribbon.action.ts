import * as types from 'action/ribbon.action.type'
import { Dispatch } from "redux"
import { ApiGetRibbonDetail, ApiRibbonLoadMore, ApiGetSearch } from "api/index.api"

export const getSearchAction = (id: string, page: number = 1) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetSearch(id, page);
        if (response.status == 200) {
            dispatch(
                getRibbonSuccess(response.data)
            )
        }
    }
}

export const searchLoadMoreAction = (id: string, page: number) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiRibbonLoadMore(id, page);
        if (response.status == 200) {
            dispatch(
                ribbonLoadMoreSuccess(response.data, page)
            )
        }
    }
}

export const getRibbonDetailAction = (id: string, page: number = 1) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetRibbonDetail(id, page);
        if (response.status == 200) {
            dispatch(
                getRibbonSuccess(response.data)
            )
        }
    }
}

export const getRibbonSuccess = (data: any) => {
    return {
        type: types.GET_RIBBON,
        data: data
    }
}

export const ribbonLoadMoreAction = (id: string, page: number) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiRibbonLoadMore(id, page);
        if (response.status == 200) {
            dispatch(
                ribbonLoadMoreSuccess(response.data, page)
            )
        }
    }
}

export const ribbonLoadMoreSuccess = (data: any, page: number) => {
    return {
        type: types.RIBBON_LOAD_MORE,
        data: data,
        page: page
    }
}
