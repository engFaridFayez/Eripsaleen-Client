export interface Attendee {
    name: string;
}

export interface BookingRequest {
    event: number;

    attendees: Attendee[];

    seats: number[];

    phone_number: string;

    email?: string;

    image?: File | null;
}

export interface BookingResponse {
    message: string;
}