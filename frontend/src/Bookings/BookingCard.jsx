import convertTime from "../utils/convertTime";
import { formateDate } from "../utils/fomateDay";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";

const BookingCard = ({ doctor, bookings }) => {
    const { selectedTime, selectedDate, _id: bookingId } = bookings;

    const bookingHandle = async () => {
        try {
            const res = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    isApproved: "cancel"
                })
            });

            const result = await res.json();
            toast.success(result.message);

            if (!res.ok) {
                throw new Error(result.message);
            }
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="p-3 lg:b-5 border border-bold mt-3  flex flex-col justify-center items-center">
            <div>
                <img src={doctor.photo} className="w-full" alt="" />
            </div>
            <h2 className="text-[18px] leading-[30px] lg:text[26px] lg:leading-9 text-headingColor font-[700px] mt-5 lg:mt-5">{doctor.name}</h2>
            <div className="mt-[18px] lg:mt-5">
                <div className='flex items-center justify-between w-[150px]'>
                    <p className="text-[16px] leading-6  font-[400] text-textColor ">{convertTime(selectedTime)} </p>
                    <p className="text-[16px] leading-6  font-[400] text-textColor ">{formateDate(selectedDate)} </p>
                </div>
                <div>
                    <button type='button'
                        onClick={bookingHandle}
                        className="w-haft bg-red-600  text-white text-5 leading-5 rounded-lg px-4 py-3 mt-2">
                        Hủy
                    </button>
                    <div className='flex items-center justify-center mt-5 w-full'>
                        <Link to={`/doctors/${doctor._id}`} className="w-[20px] h-[20px] rounded-full border border-solid border-[#181A1E]  flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookingCard;
