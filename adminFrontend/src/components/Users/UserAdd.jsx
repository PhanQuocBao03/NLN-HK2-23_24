import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import HashLoader from 'react-spinners/HashLoader';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
const DoctorAdd = ({open, handleClose})=>{
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPriviewURL] = useState("")
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        photo: selectedFile,
        role:'patient',
        gender:''

    });
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const handleInputChange = e =>{
        setFormData ({... formData, [e.target.name]: e.target.value});
    }
    const handleFileInputChange = async (event) =>{
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);
        
        setPriviewURL(data.url);
        setSelectedFile(data.url);
        setFormData({ ... formData, photo: data.url});

       
    }
    const submitHandler = async (event)=>{
       
        event.preventDefault();
         setLoading(true);
         try {
            const res = await fetch(`${BASE_URL}/auth/register`,{
                method: 'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                
            })
            const {message} = await res.json();

            if(!res.ok){
                throw new Error(message)
            }
            setLoading(false);
            toast.success(message);
            navigate('/user')
         } catch (error) {
            toast.error(error.message);
            setLoading(false);
         }
    };
    
    return(
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
    <form action="" onSubmit={submitHandler}>

      <DialogHeader className="  text-white justify-center text-[16px] bg-pink-400">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold ">Thêm 
                <span className="text-primaryColor"> Khách hàng</span></h3>
      </DialogHeader>
      <DialogBody className="p-4">
        <div className="max-w-[1170px] mx-auto">
                
            <div className="rounded-l-lg lg:pl-16 py-10">
                    <div className="mb-5">
                        <input type="text" name="name" placeholder="Họ vàn tên" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pr-4  py-3 text-[16px] bord focus:outline-none border-b border-solid border-[#0066ff61]" 
                        id="" required />
                    </div>
                    <div className="mb-5">
                        <input type="email" name="email" placeholder="Địa chỉ email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pr-4  py-3 text-[16px] border-b border-solid border-[#0066ff61] focus:outline-none
                        placeholder:text-textColor  cursor-pointer" 
                        id="" required/>
                    </div>
                    <div className="mb-5">
                        <input type="password" name="password" placeholder="Mật khẩu" 
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pr-4  py-3 text-[16px] border-b border-solid border-[#0066ff61] focus:outline-none
                        placeholder:text-textColor  cursor-pointer" 
                        id="" required/>
                    </div>
                    <div className="mb-5 flex items-center justify-between">
                        <label htmlFor=""
                            className="text-headingColor font-bold text-[16px] leading-7">
                            Are you a:
                            <select name="role" 
                            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-one"
                            id=""
                            value={formData.role}
                        onChange={handleInputChange}>
                                <option value="patient">Patient</option>
                                {/* <option value="doctor">Doctor</option> */}
                            </select>
                        </label>
                        <label htmlFor=""
                            className="text-headingColor font-bold text-[16px] leading-7">
                            Gender:
                            <select 
                                name="gender" 
                                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-one"
                                id=""
                                value={formData.gender}
                        onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">FeMale</option>
                                    <option value="other">Other</option>
                            </select>
                        </label>
                    </div>
                    <div className="mb-5 items-center gap-3 flex">
                        {selectedFile && <figure className="w-[60px] h-[60px]  rounded-full  border-2 border-solid border-primaryColor
                        flex items-center justify-content">
                            <img src={previewURL} alt="" className="w-full rounded-full"/>
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
                            font-semibold rounded-lg truncate    cursor-pointer">Thêm ảnh</label>
                        </div>

                    </div>
                    
            </div>
              
        </div>
      </DialogBody>
      <DialogFooter className="bg-gray-100 justify-end">
            <div className="mt-7 mr-5">
                <button 
                disabled = {loading && true}
                type="submit" className="w-full bg-primaryColor  text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                    {loading ? <HashLoader size={35} color="#ffffff"/>:'Đăng ký'}
                </button>
            </div>
            <div className="mt-7">
                <Button
                variant="text"
                color="red"
                onClick={handleClose}
                className="w-full bg-red-500  text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                Đóng
                </Button>
            </div>
      </DialogFooter>
      </form>

    </Dialog>
    )
}
export default DoctorAdd;