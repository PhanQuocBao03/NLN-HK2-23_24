import React, { useState, useEffect } from 'react';
import { format, addDays, isPast } from 'date-fns';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import useGetProfile from '../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ doctor }) => {
    const { data: userData } = useGetProfile(`${BASE_URL}/users/profile/me`);
    const { data: doctorData } = doctor;
    const doctorId = doctorData && doctorData._id;
    const navigate = useNavigate();

    // Xác định ngày hiện tại dựa trên múi giờ UTC và điều chỉnh cho sự lệch múi giờ
    const currentDate = new Date(Date.now());
    currentDate.setDate(currentDate.getDate() - 1);

    const [selectedDate, setSelectedDate] = useState(addDays(currentDate, 1));
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDropdownDate, setSelectedDropdownDate] = useState(format(addDays(currentDate, 1), 'yyyy-MM-dd'));
    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
    const [patientSelected, setPatientSelected] = useState(false);
    const [note, setNote] = useState('');

    useEffect(() => {
        const fetchTimeSlots = async () => {
            try {
                const response = await fetch(`${BASE_URL}/doctors/${doctorId}`);
                if (!response.ok) {
                    throw new Error('Không thể lấy danh sách thời gian');
                }
                const data = await response.json();
                const doctorData = data.data;
                const selectedDay = format(selectedDate, 'yyyy-MM-dd');
                const selectedDayTimeSlot = doctorData.timeSlots.find(slot => slot.day === selectedDay);

                if (selectedDayTimeSlot) {
                    const startTime = new Date(`${selectedDay}T${selectedDayTimeSlot.startingTime}`);
                    const endTime = new Date(`${selectedDay}T${selectedDayTimeSlot.endingTime}`);
                    setTimeSlots(generateTimeSlots(startTime, endTime));
                } else {
                    throw new Error('Không có khung giờ nào sẵn có cho ngày đã chọn');
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách thời gian:', error);
                setTimeSlots([]);
            }
        };

        const fetchBookedTimeSlots = async () => {
            try {
                const response = await fetch(`${BASE_URL}/bookings/getAll`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Không thể lấy danh sách thời gian đã đặt');
                }
                const data = await response.json();

                // Lọc danh sách thời gian đã đặt cho ngày đã chọn
                const selectedDropdownDateObject = new Date(selectedDropdownDate);
                const selectedDayBookedTimeSlots = data.data
                    .filter(slot => {
                        const slotDate = new Date(slot.selectedDate);
                        return slotDate.getTime() === selectedDropdownDateObject.getTime();
                    })
                    .map(slot => slot.selectedTime);
                
                setBookedTimeSlots(selectedDayBookedTimeSlots);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách thời gian đã đặt:', error);
                setBookedTimeSlots([]);
            }
        };

        if (doctorId) {
            fetchTimeSlots();
            fetchBookedTimeSlots();
        }
    }, [doctorId, selectedDate, selectedDropdownDate]);

    const generateTimeSlots = (startTime, endTime) => {
        const timeSlots = [];
        let currentTime = new Date(startTime);
        const endTimeObject = new Date(endTime);

        while (currentTime < endTimeObject) {
            timeSlots.push(new Date(currentTime));
            currentTime.setMinutes(currentTime.getMinutes() + 30);
        }

        console.log('Danh sách thời gian được tạo:', timeSlots);
        return timeSlots;
    };

    const handleDateChange = (event) => {
        setSelectedTime(null);
        const selectedDay = event.target.value;
        setSelectedDropdownDate(selectedDay);
        setSelectedDate(new Date(selectedDay));
    };

    const handleTimeClick = (event, time) => {
        event.preventDefault();
        setSelectedTime(time);
        setPatientSelected(true);
    };

    const isTimeSlotBooked = (time) => {
        return bookedTimeSlots.includes(format(time, 'HH:mm'));
    };

    const timeSlotAvailable = (time) => {
        const selectedDay = format(selectedDate, 'yyyy-MM-dd');
        const selectedDayTimeSlot = doctorData.timeSlots.find(slot => slot.day === selectedDay);
        if (selectedDayTimeSlot) {
            const startTime = new Date(`${selectedDay}T${selectedDayTimeSlot.startingTime}`);
            const endTime = new Date(`${selectedDay}T${selectedDayTimeSlot.endingTime}`);
            return time >= startTime && time <= endTime;
        }
        return false;
    };

    const bookingHandle = async () => {
        try {
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userData._id,
                    doctorId: doctorId,
                    selectedDate: selectedDropdownDate,
                    selectedTime: selectedTime ? format(selectedTime, 'HH:mm') : null,
                    note: note
                })
            });

            const result = await res.json();
            toast.success(result.message);

            if (!res.ok) {
                throw new Error(result.message);
            }
            navigate('/checkout-success');

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='max-w-[550px]'>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">Thông tin đặt lịch</h2>
            <form>
                <div className="mb-5">
                    <div className="form__label">Tên*</div>
                    <input type="text" name="name" value={userData?.name || ''} placeholder="Họ và Tên" className="form__input" />
                </div>
                <div className="mb-5">
                    <div className="form__label">Email*</div>
                    <input type="email" name="email" value={userData?.email || ''} placeholder="Email" className="form__input" readOnly aria-readonly disabled='true' />
                </div>
                <div className="mb-5">
                    <div className="form__label">Số điện thoại*</div>
                    <input type="number" name="phone" value={userData?.phone || ''} placeholder="Số điện thoại" className="form__input" />
                </div>
                <div className="mb-5">
                    <div className="form__label">Giới tính*</div>
                    <select name="gender" value={userData?.gender || ''} className="form__input py-3.5">
                        <option value="">Chọn</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
                <div className="mb-5">
                    <div className="form__label mb-[30px]">Ngày đặt lịch*</div>
                    <select className="form__input py-3.5" value={selectedDropdownDate} onChange={handleDateChange}>
                        {doctorData.timeSlots.map((daySlot, index) => {
                            const slotDate = new Date(daySlot.day);
                            const isDisabled = (selectedDate.getDate() >= slotDate.getDate() && isPast(selectedDate));
                            return (
                                <option key={index} value={format(slotDate, 'yyyy-MM-dd')} disabled={isDisabled}>
                                    {format(slotDate, 'dd/MM/yyyy')}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="mb-5">
                    <div className="form__label">Thời gian*</div>
                    <div className="flex flex-wrap -mx-2">
                        {timeSlots.length > 0 ? (
                            timeSlots.map((timeSlot, index) => {
                                const isDisabled = isPast(timeSlot) || isTimeSlotBooked(timeSlot);
                                return (
                                    <button
                                        key={index}
                                        onClick={(event) => handleTimeClick(event, timeSlot)}
                                        className={`flex-shrink-0 w-1/5 bg-white  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-2 mb-2 ${
                                            isTimeSlotBooked(timeSlot) ? 'bg-gray-400 text-gray-200 cursor-not-allowed' :
                                            selectedTime === timeSlot ? 'bg-blue-600 text-white' :
                                            isPast(timeSlot) ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : ''
                                        }`}
                                        disabled={isPast(timeSlot) || isTimeSlotBooked(timeSlot)}
                                    >
                                        {format(timeSlot, 'HH:mm')}
                                    </button>
                                );
                            })
                        ) : (
                            <p>Không có khung giờ nào khả dụng</p>
                        )}
                    </div>
                </div>
                <div className="mb-5">
                    <div className="form__label">Ghi chú</div>
                    <textarea
                        name="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="form__input h-24"
                        placeholder="Ghi chú về cuộc hẹn (tùy chọn)"
                    />
                </div>
                <button type="button" onClick={bookingHandle} className="w-full btn rounded-md">Đặt lịch</button>
            </form>
        </div>
    );
};

export default BookingForm;
