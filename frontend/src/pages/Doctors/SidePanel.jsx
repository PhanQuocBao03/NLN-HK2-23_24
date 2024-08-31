import convertTime from "../../utils/convertTime";
import {BASE_URL,token} from "../../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { formateDate } from "../../utils/fomateDay";



const SidePanel = ({doctorId, ticketPrice, timeSlots,})=>{

    
    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
           <div className="flex items-center justify-between">
            <p className="text__para mt-0 font-semibold">Ticket</p>
            <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                {ticketPrice} BDT
            </span>
           </div>
           <div className="mt-[30px]">
            <p className="text__para mt-0 font-semibold text-headingColor">
                Availabel Time Slost:
            </p>
            <ui className="mt-3">
                {timeSlots?.map((timeSlots,index)=>(
                     <li key={index} className="flex items-center justify-between mb-2">
                     <p className="text-[15px] leading-6  text-textColor font-semibold">
                         {formateDate (timeSlots.day)}
                     </p>
                     <p className="text-[15px] leading-6  text-textColor font-semibold">
                       {convertTime(timeSlots.startingTime)} - {convertTime(timeSlots.endingTime)}
                     </p>
                 </li>

                ))}
               
               
            </ui>
           </div>
           <Link to={`/bookings/checkout-session/${doctorId}`} >
           <button  className="btn w-full rounded-md">Book Appointment</button>


           </Link>
        </div>
        
    );
};
export default SidePanel;