import React, { useState } from "react";
import { FaEdit, FaPlusCircle, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { formateDate } from "../../../../frontend/src/utils/fomateDay";
import BookingConten from "../../components/Bookings/BookingConten";
import BookingConfirm from "../../components/Bookings/BookingConfirm";
import BookingCancel from "../../components/Bookings/BookingCancel";

const BookingPending =({bookings})=>{
  console.log("bookings", bookings);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openConten, setOpenConten] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleOpenEdit = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedDoctorId(null);
  };

  const handleOpenConten = (bookingId) => {
    setSelectedBookingId(bookingId);
    setOpenConten(true);
  };

  const handleCloseConten = () => {
    setOpenConten(false);
    setSelectedBookingId(null);
  };

  const handleOpenConfirm = (bookingId) => {
    setSelectedBookingId(bookingId);
    setOpenConfirm(true); // Fixed: Open the confirm dialog
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false); // Fixed: Close the confirm dialog
    setSelectedBookingId(null);
  };

  const handleOpenCancel = (bookingId) => {
    setSelectedBookingId(bookingId);
    setOpenCancel(true); // Fixed: Open the delete dialog
  };

  const handleCloseCancel = () => {
    setOpenCancel(false); // Fixed: Close the delete dialog
    setSelectedBookingId(null);
  };
    return(
        <div>
      <div className="mx-auto mr-[50px] mb-3">
        <button className="mx-4 flex items-center justify-around  rounded-full border  shadow-lg bg-primaryColor text-white" onClick={() => handleOpenAdd()}><FaPlusCircle className="ml-3 mr-2 my-3 text-[18px]" /><span  className="mr-3 text-[18px] font-semibold">Thêm</span></button>
      </div>
      
      <table className="w-full  text-sm text-gray-500 mt-5 text-center text-[16px]">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
          <th scope="col" className="px-6 py-3">
              Họ tên
            </th>
            <th scope="col" className="px-6 py-3">
              Giới tính
            </th>
            <th scope="col" className="px-6 py-3">
              SĐT
            </th>
            <th scope="col" className="px-6 py-3">
              Bác sĩ
            </th>
            <th scope="col" className="px-6 py-3">
              Giờ
            </th>
            <th scope="col" className="px-6 py-3">
             Ngày
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3">
              Nôi dung
            </th>
           
            <th scope="col" className="px-6 py-3">
              Xác nhận
            </th>
            <th scope="col" className="px-6 py-3">
             Hủy
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((items, index) => (
            <tr key={index} className="text-[16px] text-center">
               <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                <img
                  src={items.user.photo}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">{items.user.name}</div>
                </div>
              </td>
              <td className="px-6 py-4">{items.user.gender}</td>
              <td className="px-6 py-4">{items.user.phone}</td>
              <td className="px-6 py-4">{items.doctor.name}</td>
              <td className="px-6 py-4">{items.selectedTime}</td>
              <td className="px-6 py-4">{formateDate(items.selectedDate)}</td>
              <td className="px-6 py-4">{items.isApproved}</td>
              <td className="px-6 py-4 ">
                <button
                    className="flex items-center justify-around"
                    onClick={() => handleOpenConten(items._id)}
                >
                    <span className="mr-2 text-[18px] font-semibold">Xem</span>
                    <FaRegEye className="mt-[4px]" />
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="flex items-center justify-around  rounded-full border  shadow-lg bg-green-600 text-white"
                    onClick={() => handleOpenConfirm(items._id)}>
                        <div className="px-3 py-3 flex items-center justify-center">
                            <FaEdit />
                            <span className="ml-2 text-[18px] font-semibold ">Xác nhận</span>

                        </div>
                
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="flex items-center justify-around  rounded-full border  shadow-lg bg-red-600 text-white"
                    onClick={() => handleOpenCancel(items._id)}>
                        <div className="px-3 py-3 flex items-center justify-center">
                            <MdDelete />
                            <span className="ml-2 text-[18px] font-semibold ">Hủy</span>

                        </div>
                
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BookingConten
        bookingId={selectedBookingId}
        open={openConten}
        handleClose={handleCloseConten}
        size="lg"
        position="center"
        animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
        }}
    />
    <BookingCancel
        bookingId={selectedBookingId}
        open={openCancel}
        handleClose={handleCloseCancel}
        size="lg"
        position="center"
        animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
        }}
    />
      <BookingConfirm
        bookingId={selectedBookingId}
        open={openConfirm} // Fixed: Pass correct state
        handleClose={handleCloseConfirm}
        size="lg"
        position="center"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      />
    {/* <DoctorDelete
        doctorId={selectedDoctorId}
        open={openDelete}
        handleClose={handleCloseDelete}
        size="lg"
        position="center"
        animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
        }}
    /> */}
    </div>
    );

}

export default BookingPending;