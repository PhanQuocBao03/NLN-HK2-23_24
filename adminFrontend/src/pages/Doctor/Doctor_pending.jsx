import React, { useState } from "react";
import { FaEdit, FaPlusCircle, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DoctorDialog from "../../components/Doctors/DoctorDialog";
import DoctorConfirm from "../../components/Doctors/DoctorConfirm";

import DoctorDelete from "../../components/Doctors/DoctorDelete";

const DoctorPending =({doctors})=>{
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);

    const handleOpenEdit = (doctorId) => {
      setSelectedDoctorId(doctorId);
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
      setSelectedDoctorId(null);
    };
    const handleOpenDelete = (doctorId) => {
      setSelectedDoctorId(doctorId);
      setOpenDelete(true);
    };
  
    const handleCloseDelete = () => {
      setOpenDelete(false);
      setSelectedDoctorId(null);
  
    };
    return(
        <div>
      
      <table className="w-full  text-sm text-gray-500 mt-5 text-center text-[16px]">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Họ Tên
            </th>
            <th scope="col" className="px-6 py-3">
              Giới tính
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3">
              Xác nhận
            </th>
            <th scope="col" className="px-6 py-3">
              Xóa
            </th>
          </tr>
        </thead>
        <tbody>
          {doctors?.map((doctor, index) => (
            <tr key={index} className="text-[16px] text-center">
              <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                <img
                  src={doctor.photo}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">{doctor.name}</div>
                </div>
              </td>
              <td className="px-6 py-4">{doctor.gender}</td>
              <td className="px-6 py-4">{doctor.email}</td>
              
              <td className="px-6 py-4">{doctor.isApproved}</td>
              <td className="px-6 py-4">
                <button className="flex items-center justify-around  rounded-full border  shadow-lg bg-green-600 text-white"
                    onClick={() => handleOpenEdit(doctor._id)}>
                        <div className="px-3 py-3 flex items-center justify-center">
                            <FaEdit />
                            <span className="ml-2 text-[18px] font-semibold ">Xác nhận</span>

                        </div>
                
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="flex items-center justify-around  rounded-full border  shadow-lg bg-red-600 text-white"
                    onClick={() => handleOpenDelete(doctor._id)}>
                        <div className="px-3 py-3 flex items-center justify-center">
                            <MdDelete />
                            <span className="ml-2 text-[18px] font-semibold ">Xóa</span>

                        </div>
                
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DoctorConfirm
        doctorId={selectedDoctorId}
        open={openEdit}
        handleClose={handleCloseEdit}
        size="lg"
        position="center"
        animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
        }}
    />
    <DoctorDelete
        doctorId={selectedDoctorId}
        open={openDelete}
        handleClose={handleCloseDelete}
        size="lg"
        position="center"
        animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
        }}
    />
    </div>
    );

}

export default DoctorPending;