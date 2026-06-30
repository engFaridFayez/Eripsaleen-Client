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
  id: number;
  title: string;
  show: number;
  theater: number;
  event_date: string;
  sales_start?: string;
  sales_end?: string;
  theater_name:string;
  show_name:string;
}

export interface CreateEvent {
  title: string;
  show: number;
  theater: number;
  event_date: string;
  sales_start: string;
  sales_end: string;
}

export interface SeatMapResponse {
  event_id: number
  event_title: string
  theater: string
  sections: Section[]
}



export interface AdminSection {
    id: number
    theater: number
    name: string
}

export interface AdminRow {
    id: number
    section: number
    row_number: number
    seats_per_row: number
}

export interface AdminSeat {
    id: number
    row: number
    seat_number: string
}