import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useGetProfile from "../../hooks/useFetchData";
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL, token} from '../../../config';
import { toast } from "react-toastify";

import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useNavigate } from "react-router-dom";

const UserDialog = ({ open, handleClose, userId }) => {
  console.log("checkId",userId)
  if (!userId) {
    return null;
  }
 

  const { data: userPatient, loading, error } = useGetProfile(`${BASE_URL}/patients/${userId}`);
  console.log('checkjkj',userPatient)
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    doctor: '',
    symptoms: '',
    diagnosis: '',
    medications: '',
    additionalInstructions: '',
    createdAt:'',
    notes: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userPatient) {
      const { doctor, dateOfExamination, symptoms, diagnosis, medications, additionalInstructions, notes,createdAt } = userPatient;
      setFormData({
        doctor: doctor?.name,
        symptoms: symptoms,
        diagnosis: diagnosis,
        medications: medications ? medications.join(', ') : '',
        additionalInstructions: additionalInstructions,
        createdAt: createdAt ? createdAt.split('T')[0] : '',
        notes: notes
      });
    }
  }, [userPatient]);

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({...formData, photo: data.url});
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/patients/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
      size='lg'
      open={open}
      handler={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="mx-auto max-w-lg border border-gray-300 shadow-2xl bg-white"
    >
      <form onSubmit={submitHandler}>
        <DialogHeader className="text-white justify-center text-[18px] bg-pink-400 font-semibold">
          Bệnh Án
        </DialogHeader>
        <DialogBody className="p-4">
          <div className="mt-10">
            <div className="mb-5">
              <label htmlFor="" className="font-semibold form__label mr-5">Họ tên:</label>
              <span>{userPatient?.user?.name}</span>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="font-semibold form__label mr-5">Email:</label>
              <span>{userPatient?.user?.email}</span>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="font-semibold form__label mr-5">Số điện thoại:</label>
              <span>{userPatient?.user?.phone}</span>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="font-semibold form__label">Bác sĩ điều trị:</label>
              <input 
                type="text" 
                name="doctor" 
                value={formData.doctor}
                onChange={handleInputChange}
                className="border-b border-solid focus:outline-none form__input"
                required 
              />
            </div>
            <div className="mb-5">
              <label htmlFor="dateOfExamination" className="font-semibold form__label mr-5">Ngày khám:</label>
              <input 
                type="date" 
                name="dateOfExamination" 
                value={formData.dateOfExamination}
                onChange={handleInputChange}
                className="border-b border-solid focus:outline-none form__input"
                required 
              />
            </div>
            <div className="mb-5">
              <label htmlFor="symptoms" className="font-semibold form__label">Triệu chứng:</label>
              <textarea 
                name="symptoms" 
                value={formData.symptoms}
                onChange={handleInputChange}
                className="border-b border-solid focus:outline-none form__input"
                rows="3" 
                required 
              />
            </div>
            <div className="mb-5">
              <label htmlFor="diagnosis" className="font-semibold form__label">Chuẩn đoán:</label>
              <textarea 
                name="diagnosis" 
                value={formData.diagnosis}
                onChange={handleInputChange}
                className="border-b border-solid focus:outline-none form__input"
                rows="3" 
                required 
              />
            </div>
            <div className="mb-5">
              <label htmlFor="medications" className="font-semibold form__label">Đơn thuốc:</label>
              <textarea 
                name="medications" 
                value={formData.medications}
                onChange={handleInputChange}
                className="border-b border-solid focus:outline-none form__input"
                rows="3" 
                required 
              />
            </div>
            <div className="mb-5">
              <label htmlFor="additionalInstructions" className="font-semibold form__label">Hướng dẫn thêm:</label>
              <textarea 
                name="additionalInstructions" 
                value={formData.additionalInstructions}
                onChange={handleInputChange}
                className="border-b border-solid focus:outline-none form__input"
                rows="3" 
              />
            </div>
            <div className="mb-5">
              <label htmlFor="notes" className="font-semibold form__label">Ghi chú:</label>
              <textarea 
                name="notes" 
                value={formData.notes}
                onChange={handleInputChange}
                className="border-b border-solid focus:outline-none form__input"
                rows="3" 
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="bg-gray-100 justify-end d-flex">
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="bg-red-500 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg col-md-2"
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

export default UserDialog;
