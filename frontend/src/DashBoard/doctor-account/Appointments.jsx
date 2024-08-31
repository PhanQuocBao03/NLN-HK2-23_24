import { useEffect, useState } from "react";
import { formateDate } from "../../utils/fomateDay";
import { FaEdit, FaEye, FaPlusCircle, FaRegEye } from "react-icons/fa";

import convertTime from "../../utils/convertTime";
import convertToUpperCase from "../../utils/coverUperCase";

import UserDialog from "./UserDialog";

const Appointments = ({appointments}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleOpenDialog = (userId) => {
        setSelectedUserId(userId);
        setOpenDialog(true);
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUserId(null);
      };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const filteredAppointments = appointments.filter((item) => {
        return formateDate(new Date(item.selectedDate)) === selectedDate; // Lọc theo ngày được chọn
    });

    useEffect(() => {
        const today = new Date();
        const nearestDate = appointments.reduce((nearest, current) => {
            const currentDate = new Date(current.selectedDate);
            if (!nearest || Math.abs(currentDate - today) < Math.abs(nearest - today)) {
                return currentDate;
            }
            return nearest;
        }, null);
        setSelectedDate(nearestDate ? formateDate(nearestDate) : null);
    }, [appointments]);

    return(
        <>
        <select  className="form__input py-3.5 w-[150px]" value={selectedDate} onChange={handleDateChange} id="">
            {appointments.map((item, index) => (
                    <option key={index} value={formateDate(new Date(item.selectedDate))}>
                        {formateDate(new Date(item.selectedDate))}
                    </option>
                ))}
        </select>
        <table className="w-full text-left text-sm text-gray-500 mt-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Tên</th>
                    <th scope="col" className="px-6 py-3">Giới tính</th>
                    <th scope="col" className="px-6 py-3">Thời gian</th>
                    <th scope="col" className="px-6 py-3">Ngày</th>
                    <th scope="col" className="px-6 py-3">Trạng thái</th>
                    <th scope="col" className="px-6 py-3">Bệnh án</th>
                </tr>
                
            </thead>
            <tbody>
                {filteredAppointments?.map((item, index)=>(
                    <tr key={index} className="">
                        <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                            <img src={item.user.photo} className="w-10 h-10 rounded-full" alt="" />
                            <div className="pl-3">
                                <div className="text-base font-semibold"> {item.user.name}</div>
                                <div className="text-normal text-gray-500">
                                    {item.user.email}
                                </div>
                            </div>
                        </th>
                        <td className="px-6 py-4">{item.user.gender}</td>
                        <td className="px-6 py-4">{convertTime(item.selectedTime)}</td>
                        <td className="px-6 py-4">{formateDate(new Date(item.selectedDate))}</td>
                        <td className={`${item.isApproved === 'pending'?'text-primaryColor font-bold' : item.isApproved === 'approved'?"text-green-600":"" }  px-6 py-4`}>{convertToUpperCase(item.isApproved)}</td>
                                <td className="px-6 py-4">
                        <button className="flex items-center justify-around  rounded-full border  shadow-lg bg-gray-500 text-white"
                            onClick={() => handleOpenDialog(item.user._id)}
                            >

                                <div className="px-3 py-3 flex items-center justify-center">
                                    <FaEye />
                                    <span className="ml-2 text-[18px] font-semibold ">Xem</span>

                                </div>
                        
                        </button>
              </td>

                    </tr>
                ))}
            </tbody>
        </table>
        
        <UserDialog
        userId={selectedUserId}
        open={openDialog}
        handleClose={handleCloseDialog}
        size="lg"
        position="center"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      />
        </>
    )
};
export default Appointments;
