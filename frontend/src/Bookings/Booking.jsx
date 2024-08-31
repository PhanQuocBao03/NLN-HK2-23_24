
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from "../components/Loader/Loading"
// import useGetProfile from '../hooks/useFetchData';
import BookingForm from './BookingForm';
import DoctorProfile from './DoctorProfile';
import { BASE_URL } from '../../config';


const Booking = () => {
    const { doctorId } = useParams();
    const [doctorData, setDoctorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/doctors/${doctorId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch doctor data');
                }
                const data = await response.json();
                setDoctorData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [doctorId]);

    if (loading) return <div><Loader/></div>;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div className="flex items-center justify-center">
            
            <DoctorProfile doctor={doctorData} />
            <BookingForm doctor={doctorData} />
           
        </div>
    );
};

export default Booking;
