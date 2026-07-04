export interface Attendee {
  seat: number;

  seat_name: string;

  person_name: string;

  national_id: string;
}

export interface BookingRequest {
  event: number;

  owner_name: string;

  attendees: Attendee[];

  phone_number: string;

  email?: string;

  image?: File | null;
}

export interface BookingResponse {
  message: string;
}

export interface BookingSeat {
  id: number;

  person_name: string;

  national_id: string;

  seat_name: string;

  row: string;

  section: string;

  price: number;
}

export interface Booking {
  id: number;
  status: "pending" | "confirmed" | "cancelled";
  event: number;

  event_name: string;

  theater_name: string;

  owner_name: string;

  email: string;

  phone_number: string;

  image: string | null;

  seats_count: number;

  total_price: number;

  created_at: string;

  seats: BookingSeat[];
}

export interface ChangeBookingStatusRequest {
  status: "pending" | "confirmed" | "cancelled";
}