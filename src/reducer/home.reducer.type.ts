export interface HomeState {
    banner?: Array<BannerItem>,
    ribbon?: Array<RibbonItem>,
}

export interface BannerItem {
    id: string,
    slug: string,
    images: {
        banner: string
    }
}

export interface RibbonItem {
    id: string,
    name: string,
    item: Array<MovieItem>
}

export interface MovieItem {
    id: string,
    title: string,
    views: number,
    favorites: number,
    images: {
        poster: string
    }
}