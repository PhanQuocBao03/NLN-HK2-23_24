import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import BookingCard from "../../Bookings/BookingCard";

const MyBookings = () => {
    const { data, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

    if (loading) return <Loader />;
    if (error) return <Error />;

    const filteredBookings = data?.bookings?.filter(booking => booking.isApproved === "pending") || [];

    return (
        <div>
            {filteredBookings.length === 0 && (
                <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">You did not book any doctor yet!</h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {filteredBookings.map(bookings => (
                    <BookingCard key={bookings._id} doctor={getDoctorById(data.doctors, bookings.doctor._id)} bookings={bookings} />
                ))}
            </div>
        </div>
    );
};

const getDoctorById = (doctors, doctorId) => doctors.find(doctor => doctor._id === doctorId);

export default MyBookings;
