import api from "@/services/api";
import type {
    BookingRequest,
    BookingResponse
} from "@/types/booking";

class BookingService {

    async createBooking(data: BookingRequest): Promise<BookingResponse> {

        const formData = new FormData();

        formData.append("event", data.event.toString());

        formData.append(
            "attendees",
            JSON.stringify(
                data.attendees.map(x => x.name)
            )
        );

        formData.append(
            "seats",
            JSON.stringify(data.seats)
        );

        formData.append(
            "phone_number",
            data.phone_number
        );

        if (data.email) {
            formData.append("email", data.email);
        }

        if (data.image) {
            formData.append("image", data.image);
        }

        const response = await api.post<BookingResponse>(
            "multi-booking/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;
    }

}

export default new BookingService();