export interface MenuState {
    data?: Array<MenuItem>,
    show?: boolean,
    title?: string
}

export interface MenuItem {
    id: string,
    name: string,
    slug: string,
    required: boolean,
    icon: string
}
