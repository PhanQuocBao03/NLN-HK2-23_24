// Frontend (React)
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";

const PatientAdd = ({ open, handleClose, userId }) => {
  const [formData, setFormData] = useState({
    doctorId: "",
    user: userId,
    dateOfExamination: "",
    symptoms: "",
    diagnosis: "",
    medications: "",
    additionalInstructions: "",
    notes: "",
  });

  useEffect(() => {
    // Lấy thông tin bác sĩ từ localStorage và lưu doctorId vào state
    const doctorInfo = JSON.parse(localStorage.getItem("doctorInfo"));
    if (doctorInfo) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        doctorId: doctorInfo._id, // Lưu ID của bác sĩ vào doctorId
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/patients/${userId}/addPatientRecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="mx-auto max-w-lg border border-gray-300 shadow-2xl bg-white"
    >
      <form onSubmit={handleSubmit}>
        <DialogHeader className="text-white justify-center text-[18px] bg-pink-400 font-semibold">
          Bệnh Án Mới
        </DialogHeader>
        <DialogBody className="p-4">
          <div className="mt-10">
            <div className="mb-5">
              <input
                type="hidden" // Đổi thành trường ẩn để lưu doctorId
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
              />
            </div>
            {/* Các trường khác trong form */}
          </div>
        </DialogBody>
        <DialogFooter className="bg-gray-100 justify-end d-flex">
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="bg-red-500 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Đóng
          </Button>
          <Button
            type="submit"
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg ml-4"
          >
            Lưu
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default PatientAdd;
