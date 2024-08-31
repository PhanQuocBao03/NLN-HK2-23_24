import React, { useState } from "react";
import { FaEdit, FaPlusCircle, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DoctorDialog from "../../components/Doctors/DoctorDialog";
import DoctorEdit from "../../components/Doctors/DoctorEdit";
import DoctorAdd from "../../components/Doctors/DoctorAdd";
import DoctorDelete from "../../components/Doctors/DoctorDelete";

const DoctorApproved = ({ doctors }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleOpenDialog = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDoctorId(null);
  };
  const handleOpenEdit = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedDoctorId(null);
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleOpenDelete = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedDoctorId(null);

  };

  return (
    <div>
      <div className="mx-auto mr-[50px] mb-3">
        <button className="mx-4 flex items-center justify-around  rounded-full border  shadow-lg bg-primaryColor text-white" onClick={() => handleOpenAdd()}><FaPlusCircle className="ml-3 mr-2 my-3 text-[18px]" /><span  className="mr-3 text-[18px] font-semibold">Thêm</span></button>
      </div>
      <table className="w-full  text-sm text-gray-500 mt-5 text-center text-[16px]">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Họ Tên
            </th>
            <th scope="col" className="px-6 py-3">
              Khoa
            </th>
            <th scope="col" className="px-6 py-3">
              Giới tính
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              SĐT
            </th>
            <th scope="col" className="px-6 py-3">
              Thời gian
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3">
              Chỉnh sửa
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
              <td className="px-6 py-4">{doctor.specialization}</td>
              <td className="px-6 py-4">{doctor.gender}</td>
              <td className="px-6 py-4">{doctor.email}</td>
              <td className="px-6 py-4">{doctor.phone}</td>
              <td className="px-6 py-4 ">
                <button
                    className="flex items-center justify-around"
                    onClick={() => handleOpenDialog(doctor._id)}
                >
                    <span className="mr-2 text-[18px] font-semibold">Xem</span>
                    <FaRegEye className="mt-[4px]" />
                </button>
              </td>
              <td className="px-6 py-4">{doctor.isApproved}</td>
              <td className="px-6 py-4">
                <button className="flex items-center justify-around  rounded-full border  shadow-lg bg-green-600 text-white"
                    onClick={() => handleOpenEdit(doctor._id)}>
                        <div className="px-3 py-3 flex items-center justify-center">
                            <FaEdit />
                            <span className="ml-2 text-[18px] font-semibold ">Chỉnh sửa</span>

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
      <DoctorDialog
        doctorId={selectedDoctorId}
        open={openDialog}
        handleClose={handleCloseDialog}
        size="lg"
        position="center"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      />
      <DoctorEdit
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
    <DoctorAdd
        open={openAdd}
        handleClose={handleCloseAdd}
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
};

export default DoctorApproved;
