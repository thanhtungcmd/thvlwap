export interface MenuState {
    data: Array<MenuItem>
}

export interface MenuItem {
    id: string,
    name: string,
    slug: string,
    required: boolean,
    icon: string
}
