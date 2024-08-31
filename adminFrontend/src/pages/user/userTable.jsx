
import React, { useState } from "react";
import { FaEdit, FaEye, FaPlusCircle, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UserAdd from "../../components/Users/UserAdd";
import UserDelete from "../../components/Users/UserDelete";
import UserEdit from "../../components/Users/UserEdit";
import UserDialog from "../../components/Users/UserDialog";


const userTable = ({ users }) => {
    console.log('check',users)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenDialog = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };
  const handleOpenEdit = (userId) => {
    setSelectedUserId(userId);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUserId(null);
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleOpenDelete = (userId) => {
    setSelectedUserId(userId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedUserId(null);

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
              Giới tính
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              SĐT
            </th>
            <th scope="col" className="px-6 py-3">
              Bệnh án
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
          {currentItems?.map((items, index) => (
            <tr key={index} className="text-[16px] text-center">
              <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                <img
                  src={items.photo}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">{items.name}</div>
                </div>
              </td>
             
              <td className="px-6 py-4">{items.gender}</td>
              <td className="px-6 py-4">{items.email}</td>
              <td className="px-6 py-4">0{items.phone}</td>
              <td className="px-6 py-4">
                <button className="flex items-center justify-around  rounded-full border  shadow-lg bg-gray-500 text-white"
                    onClick={() => handleOpenDialog(items._id)}
                    >
                        <div className="px-3 py-3 flex items-center justify-center">
                            <FaEye />
                            <span className="ml-2 text-[18px] font-semibold ">Xem</span>

                        </div>
                
                </button>
              </td>
              
              <td className="px-6 py-4">
                <button className="flex items-center justify-around  rounded-full border  shadow-lg bg-green-600 text-white"
                    onClick={() => handleOpenEdit(items._id)}
                    >
                        <div className="px-3 py-3 flex items-center justify-center">
                            <FaEdit />
                            <span className="ml-2 text-[18px] font-semibold ">Chỉnh sửa</span>

                        </div>
                
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="flex items-center justify-around  rounded-full border  shadow-lg bg-red-600 text-white"
                    onClick={() => handleOpenDelete(items._id)}
                    >
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
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded-lg ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
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
      
      
      <UserEdit
        userId={selectedUserId}
        open={openEdit}
        handleClose={handleCloseEdit}
        size="lg"
        position="center"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
    />
    <UserAdd
        open={openAdd}
        handleClose={handleCloseAdd}
        size="lg"
        position="center"
        animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
        }}
    />
    <UserDelete
        userId={selectedUserId}
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

export default userTable;
