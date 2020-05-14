import { MovieItem } from "./home.reducer.type";

export interface RibbonState {
    id?: string,
    name?: string,
    items?: Array<MovieItem>,
    metadata?: {
        total: number,
        limit: number,
        page: number
    }
}


