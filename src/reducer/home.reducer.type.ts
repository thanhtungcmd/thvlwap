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
    items: Array<MovieItem>
}

export interface MovieItem {
    id: string,
    title: string,
    views: number,
    favorites: number,
    short_description: string,
    slug: string,
    images: {
        thumbnail: string
    }
}
