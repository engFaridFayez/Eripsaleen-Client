export interface Show {
    id: number
    title: string
    description: string
    cover: string
}

export interface ShowEvent {
    id: number
    title: string
    theater: string
    event_date: string
}

export interface ShowDetail extends Show {
    events: ShowEvent[]
}