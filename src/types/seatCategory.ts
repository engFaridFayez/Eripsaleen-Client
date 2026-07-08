export interface SeatCategory {
    id: number;
    theater: number;
    name: string;
    color: string;
    price: number;
}

export interface CreateSeatPayload {
  row: number;
  seat_number: string;
  category: number;
}

export interface GenerateSeatsPayload {
  prefix: string;
  start: number;
  end: number;
  category: number;
}