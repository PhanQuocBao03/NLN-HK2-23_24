import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useFetchData from "../../hooks/useFetchData";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL, token} from '../../../config';
import { toast } from "react-toastify";

const DoctorEdit = ({ open, handleClose, doctorId }) => {
  const { data:doctorData, loading, error } = useFetchData(`${BASE_URL}/doctors/${doctorId}`);
  console.log("check",doctorData)
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    phone: '',
    bio:'',
    gender:'',
    specialization:'',
    ticketPrice:0,
    qualifications:[],
    experiences:[],
    timeSlots:[],
    about:'',
    photo: null,


});
useEffect(()=>{
    setFormData({
        name:doctorData?.name,
        email:doctorData?.email,
        phone: doctorData?.phone,
        bio:doctorData.bio,
        gender:doctorData.bio,
        specialization:doctorData.specialization,
        ticketPrice:doctorData.ticketPrice,
        qualifications:doctorData.qualifications,
        experiences:doctorData.experiences,
        timeSlots:doctorData.timeSlots,
        about:doctorData.about,
        photo: doctorData.photo,

    })
},[doctorData])
// const navigate = useNavigate()

const handleInputChange = e =>{
    setFormData ({... formData, [e.target.name]: e.target.value});
}
const handleFileInputChange = async event=>{
    const file = event.target.files[0]
    const data = await uploadImageToCloudinary(file)
    setFormData({ ... formData, photo: data?.url});
}
const updateProfileHandle = async e =>{
    e.preventDefault();
    try {
        const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
            
        })
        const result = await res.json();
        toast.success(result.message);
        // navigate('/users/profile/me')

        if(!res.ok){
            throw  Error(result.message)
        }
    } catch (error) {
        toast.error(error.message);
        // setLoading(false);


        
    }
};
// reusable function for adding item
const addItem = (key, item)=>{
    setFormData(prevFormData=>({...prevFormData, [key]:[...prevFormData[key],item]}))
};
const deleteItem = (key, index)=>{
    setFormData(prevFormData=>({...prevFormData, 
        [key]:prevFormData[key].filter((_,i)=> i !== index)}))

}

const handelReusableInputChangeFunc =(key, index, event)=>{
    const {name, value}= event.target
    setFormData(prevFormData=>{
        const updateItems = [...prevFormData[key]];
        updateItems[index][name] = value;

        return{
            ...prevFormData,
            [key]: updateItems,
        }

    })
}
// ===============================================================
const addQualification = e=>{
    e.preventDefault();
    addItem('qualifications',{
        startingDate: '' , endingDate:'', degree:"PHD", university:"CTu",
    })
}
const handleQualificationChange = (event, index) =>{
    handelReusableInputChangeFunc('qualifications', index, event)
}
const deleteQualifications = (e , index)=>{
    e.preventDefault()
    deleteItem('qualifications', index)
};
// ===============================================================
const addExperience = e=>{
    e.preventDefault();
    addItem('experiences',{ startingDate: '' , endingDate:'', position:'Senior', hospital:'Canther'})
}
const handleExperienceChange = (event, index) =>{
    handelReusableInputChangeFunc('experiences', index, event)
}
const deleteExperience = (e , index)=>{
    e.preventDefault()
    deleteItem('experiences', index)
}

// ================================================================
const addTimeSlot = e=>{
    e.preventDefault();
    addItem('timeSlots',{ day: '' , startingTime:'', endingTime:'', })
}
const handleTimeSlotChange = (event, index) =>{
    handelReusableInputChangeFunc('timeSlots', index, event)
}
const deleteTimeSlot = (e , index)=>{
    e.preventDefault()
    deleteItem('timeSlots', index)
}

  return (
    <Dialog
      size={1024}
      open={open}
      handler={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="mx-auto max-w-lg border border-gray-300 shadow-2xl bg-white"
    >
     <form>

      <DialogHeader className="  text-white justify-center text-[16px] bg-pink-400">
        Chỉnh sửa thông tin Bác sĩ
      </DialogHeader>
      <DialogBody className="p-4">
      <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                    Thông tin bác sĩ
            </h2>
                <div className="mb-5">
                    <div className="form__lable "> Name*</div>
                    <input type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Full Name " 
                    className="form__input"/>
                </div>
                <div className="mb-5">
                    <div className="form__lable "> Email*</div>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} 
                    placeholder="Email " className="form__input" readOnly aria-readonly disabled='true'/>
                </div>
                <div className="mb-5">
                    <div className="form__lable "> Phone*</div>
                    <input type="number" name="phone" value={formData.phone} onChange={handleInputChange} 
                    placeholder="Phone " className="form__input" />
                </div>
                <div className="mb-5">
                    <div className="form__lable "> Bio*</div>
                    <input type="text" name="bio" value={formData.bio} onChange={handleInputChange} 
                    placeholder="Bio " className="form__input" maxLength={200}/>
                </div>

                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className="form__label">Gender*</p>
                            <select name="gender" value={formData.gender} onChange={handleInputChange}
                            className="form__input py-3.5">
                                <option value="">Seclect</option>
                                <option value="male">Name</option>
                                <option value="female">Nữ</option>
                                <option value="other">other</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Specialization*</p>
                            <select name="specialization" value={formData.specialization} onChange={handleInputChange}
                            className="form__input py-3.5">
                                <option value="">Chọn</option>
                                <option value="surgeon">Bác sĩ phẫu thuật</option>
                                <option value="neurologist">Bác sĩ thần kinh</option>
                                <option value="dermatologist">Bác sĩ da liễu</option>
                                <option value="internalMedicine">Bác sĩ nội tiết</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Ticket Price*</p>
                            <input type="number" 
                                placeholder="100"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                className="form__input "
                            />
                        </div>

                        
                    </div>
                </div>

                <div className="mb-5">
                    <p className="form__lable"> Qualifications</p>
                    {
                        formData.qualifications?.map((item, index)=> <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form__label">Starting Date*</p>
                                        <input onChange={e=>handleQualificationChange(e, index)} type="date" name="startingDate"  value={item.startingDate} className="form__input" />
                                    </div>
                                    <div>
                                        <p className="form__label">Ending Date*</p>
                                        <input onChange={e=>handleQualificationChange(e, index)} type="date" name="endingDate"  value={item.endingDate} className="form__input" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div>
                                        <p className="form__label">Degree*</p>
                                        <input onChange={e=>handleQualificationChange(e, index)} type="text" name="degree"  value={item.degree} className="form__input" />
                                    </div>
                                    <div>
                                        <p className="form__label">University*</p>
                                        <input onChange={e=>handleQualificationChange(e, index)} type="text" name="university"  value={item.university} className="form__input" />
                                    </div>
                                </div>
                                    <button onClick={e => deleteQualifications(e, index)} className="bg-red-600 rounded-full text-white text-[32px] mt-2 mb-[30px] cursor-pointer">
                                        <AiOutlineDelete />
                                    </button>
                            </div>
                        </div>)
                    }
                    <button onClick={addQualification} className="bg-[#000] py-2 px-5  rounded text-white h-fit cusror-pointer"> Add Qualifications</button>
                </div>
                <div className="mb-5">
                    <p className="form__lable"> experiences*</p>
                    {
                        formData.experiences?.map((item, index)=> <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form__label">Starting Date*</p>
                                        <input  onChange={e=>handleExperienceChange(e, index)} type="date" name="startingDate"  value={item.startingDate} className="form__input" />
                                    </div>
                                    <div>
                                        <p className="form__label">Ending Date*</p>
                                        <input  onChange={e=>handleExperienceChange(e, index)} type="date" name="endingDate"  value={item.endingDate} className="form__input" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div>
                                        <p className="form__label">Position*</p>
                                        <input  onChange={e=>handleExperienceChange(e, index)} type="text" name="position"  value={item.position} className="form__input" />
                                    </div>
                                    <div>
                                        <p className="form__label">Hospital*</p>
                                        <input onChange={e=>handleExperienceChange(e, index)} type="text" name="hospital"  value={item.hospital} className="form__input" />
                                    </div>
                                </div>
                                    <button  onClick={e => deleteExperience(e, index)} className="bg-red-600 rounded-full text-white text-[32px] mt-2 mb-[30px] cursor-pointer">
                                        <AiOutlineDelete />
                                    </button>
                            </div>
                        </div>)
                    }
                    <button onClick={addExperience} className="bg-[#000] py-2 px-5  rounded text-white h-fit cusror-pointer"> Add experiences</button>

                </div>
                   
                <div className="mb-5">
                    <p className="form__lable"> Time Slots*</p>
                    {
                        formData.timeSlots?.map((item, index)=> <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                    <div>
                                        <p className="form__label">Day*</p>
                                        {/* <select onChange={e=>handleTimeSlotChange(e, index)} name="day" value={item.day} className="form__input py-3.5">
                                            <option value="">Select</option>
                                            <option value="sunday">Sunday</option>
                                            <option value="saturday">Satusday</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                        </select> */}
                                        <input type="date" onChange={e=>handleTimeSlotChange(e, index)} name="day" value={item.day} className="form__input py-3.5"/>
                                    </div>
                                    <div>
                                        <p className="form__label">Bắt đầu*</p>
                                        <input onChange={e=> handleTimeSlotChange(e, index)} type="time" name="startingTime"  value={item.startingTime} className="form__input" />
                                    </div>
                                    <div>
                                        <p className="form__label">Kết thúc*</p>
                                        <input onChange={e=> handleTimeSlotChange(e, index)} type="time" name="endingTime"  value={item.endingTime} className="form__input" />
                                        
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={e => deleteTimeSlot(e, index)}  className="bg-red-600 rounded-full text-white text-[22px] mt-6  cursor-pointer">
                                            <AiOutlineDelete />
                                        </button>

                                    </div>
                                </div>
                                
                                
                              
                            </div>
                        </div>)
                    }
                    <button onClick={addTimeSlot} className="bg-[#000] py-2 px-5  rounded text-white h-fit cusror-pointer"> Add TimeSlot</button>
                </div>
                <div className="mb-5">
                    <p className="form__lable">About</p>
                    <textarea name="about"  rows={5} value={formData.about} placeholder="Write about you" onChange={handleInputChange}  className="form__input"></textarea>
                </div>
                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && 
                    <figure className="w-[60px] h-[60px]  rounded-full  border-2 border-solid border-primaryColor
                                flex items-center justify-content">
                                    <img src={formData.photo} alt="" className="w-full rounded-full"/>
                                </figure>}
                                <div className="relative w-[130px] h-[50px]">
                                    <input type="file"
                                    name="photo"
                                    id="customfile"
                                    accept=".jpg, .png"
                                    onChange={ handleFileInputChange}
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                    <label htmlFor="customfile"className="absolute top-0 left-0 w-full h-full
                                    flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor
                                    font-semibold rounded-lg truncate    cursor-pointer">Upload Photo</label>
                                </div>
                </div>
                
        </div>
      </DialogBody>
      <DialogFooter className="bg-gray-100 justify-end">
        <div className="mt-7 mr-3">
            <button type="submit" onClick={updateProfileHandle} className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">Cập nhật</button>
        </div>
        <div className="mt-7">
            <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="bg-red-500 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
            >
            Đóng
            </Button>
        </div>
        
      </DialogFooter>
      </form>

    </Dialog>
  );
};

export default DoctorEdit;
