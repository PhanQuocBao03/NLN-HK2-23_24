import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";

const DoctorConfirm = ({ open, handleClose, doctorId }) => {
  const { data: doctorData, loading, error } = useFetchData(`${BASE_URL}/doctors/${doctorId}`);
  const [formData, setFormData] = useState({
    name: '',
    isApproved: '', // Remove default value
  });

  useEffect(() => {
    if (doctorData) {
      setFormData({
        name: doctorData.name,
        isApproved: doctorData.isApproved,
      });
    }
  }, [doctorData]);

  const updateIsApproved = async (e) => {
    e.preventDefault();
    try {
      const updatedDoctorData = { ...doctorData, isApproved: 'approved' }; // Update isApproved to 'approved'

      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDoctorData),
      });
      
      if (!res.ok) {
        throw new Error('Xác nhận không thành công!');
      }

      toast.success('Tài khoản đã được xác nhận');
      handleClose(); // Close dialog after successful update
    } catch (error) {
      toast.error('Failed to update doctor status');
      console.error('Error updating doctor status:', error.message);
    }
  };

  return (
    <Dialog
      size="lg"
      open={open}
      onClose={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="mx-auto max-w-lg border border-gray-300 shadow-2xl bg-white"
    >
      <form onSubmit={updateIsApproved}>
        <DialogHeader className="text-white justify-center text-[16px] bg-pink-400">
          Xác nhận tài khoản Bác sĩ
        </DialogHeader>
        <DialogBody className="p-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {doctorData && (
            <div>
              <p>
                Bạn xác nhận{" "}
                <span className="text-[18px] font-semibold text-primaryColor">
                  {doctorData.name}
                </span>{" "}
                là Bác sĩ tại phòng khám ?
              </p>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="bg-gray-100 justify-end">
          <div className="mt-7 mr-3">
            <button
              type="submit"
              className="bg-green-600 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
            >
              Xác nhận
            </button>
          </div>
          <div className="mt-7">
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="text-white bg-red-500 text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
            >
              Đóng
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default DoctorConfirm;
