import React, { useEffect, useState } from "react";

import useGetProfile from "../../hooks/useFetchData";
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL, token} from '../../../config';

import Loading from "../../components/Loader/Loading";
import { useNavigate } from "react-router-dom";

const Patient = ({userData }) => {
    console.log('check',userData)

  const { data: userPatient, loading, error } = useGetProfile(`${BASE_URL}/patients/getPatient/${userData._id}`);
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
    <div
      size='lg'
      
      className="mx-auto max-w-lg "
    >
      <div className="text-white justify-center text-[18px]  font-semibold">
        Bệnh Án
      </div>
      <div className="p-4">
        <div className="mt-10">
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label mr-5">Họ tên:</label>
            <span>{userData.name}</span>
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label mr-5">Email:</label>
            <span>{userData.email}</span>
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label mr-5">Số điện thoại:</label>
            <span>{userData.phone}</span>
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label">Bác sĩ điều trị:</label>
            <input 
              type="text" 
              name="doctor" 
              value={formData.doctor}
              onChange={handleInputChange}
              readOnly
              className="w-full pr-4  py-3 text-[16px] border-b border-solid focus:outline-none
                    placeholder:text-textColor  cursor-pointer"
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
              className="w-full pr-4  py-3 text-[16px] border-b border-solid focus:outline-none
                    placeholder:text-textColor  cursor-pointer"
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
              className="w-full pr-4  py-3 text-[16px] border-b border-solid focus:outline-none
                    placeholder:text-textColor  cursor-pointer"
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
              className="w-full pr-4  py-3 text-[16px] border-b border-solid focus:outline-none
                    placeholder:text-textColor  cursor-pointer"
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
              className="w-full pr-4  py-3 text-[16px] border-b border-solid focus:outline-none
                    placeholder:text-textColor  cursor-pointer"
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
              className="w-full pr-4  py-3 text-[16px] border-b border-solid focus:outline-none
                    placeholder:text-textColor  cursor-pointer"
              rows="3" 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-semibold form__label">Ghi chú:</label>
            <textarea 
              name="notes" 
              value={formData.notes}
              onChange={handleInputChange}
              
              className="w-full pr-4  py-3 text-[16px] border-b border-solid focus:outline-none
                    placeholder:text-textColor  cursor-pointer"
              rows="3" 
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Patient;
