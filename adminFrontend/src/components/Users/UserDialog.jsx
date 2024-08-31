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

import Loading from "../../components/Loader/Loading";
import { useNavigate } from "react-router-dom";

const UserDialog = ({ open, handleClose, userId }) => {
  console.log('checkdata',userId)
  const { data: userPatient, loading, error } = useGetProfile(`${BASE_URL}/patients/getPatient/${userId}`);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    doctor: '',
    // dateOfExamination: '',
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
        // dateOfExamination: dateOfExamination ? dateOfExamination.split('T')[0] : '',
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
              readOnly
              className="border-b border-solid focus:outline-none form__input"
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label">Ngày khám:</label>
            <input 
              type="date" 
              name="dateOfExamination" 
              value={formData.createdAt}
              onChange={handleInputChange}
              readOnly
              className="border-b border-solid focus:outline-none form__input"
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label">Triệu chứng:</label>
            <textarea 
              name="symptoms" 
              value={formData.symptoms}
              onChange={handleInputChange}
              readOnly
              className="border-b border-solid focus:outline-none form__input"
              rows="3" 
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label">Chuẩn đoán:</label>
            <textarea 
              name="diagnosis" 
              value={formData.diagnosis}
              onChange={handleInputChange}
              readOnly
              className="border-b border-solid focus:outline-none form__input"
              rows="3" 
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label">Đơn thuốc:</label>
            <textarea 
              name="medications" 
              value={formData.medications}
              onChange={handleInputChange}
              readOnly
              className="border-b border-solid focus:outline-none form__input"
              rows="3" 
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label">Hướng dẫn thêm:</label>
            <textarea 
              name="additionalInstructions" 
              value={formData.additionalInstructions}
              onChange={handleInputChange}
              readOnly
              className="border-b border-solid focus:outline-none form__input"
              rows="3" 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label">Ghi chú:</label>
            <textarea 
              name="notes" 
              value={formData.notes}
              onChange={handleInputChange}
              readOnly
              className="border-b border-solid focus:outline-none form__input"
              rows="3" 
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="bg-gray-100 justify-end">
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="bg-red-500 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
        >
          Đóng
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UserDialog;
