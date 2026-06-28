export interface Seat {
  id: number
  seat_number: string
  is_booked: boolean

  category: string
  color: string
  price: number
}

export interface Row {
  id: number
  row_number: number
  seats_per_row: number
  seats: Seat[]
}

export interface Section {
  id: number
  name: string
  position?: string
  side?: string
  location?: string
  type?: string
  rows: Row[]
}

export interface Event {
  id: number
  title: string
  theater: string
  event_date: string
}

export interface SeatMapResponse {
  event_id: number
  event_title: string
  theater: string
  sections: Section[]
}
