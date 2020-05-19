export interface AuthState {
    profile?: {
        id: string,
        email: string,
        first_name: string
    },
    mobifone?: {
        msisdn: string,
        package: string
    },
    error?: string
}
