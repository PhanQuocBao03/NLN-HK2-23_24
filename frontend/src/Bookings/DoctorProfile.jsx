import useGetProfile from '../hooks/useFetchData';

import startIcon from "../assets/images/Star.png"
import phoneIcon from "../assets/images/phone-icon.png";
import mailIcon from "../assets/images/mail-icon.png";


const DoctorProfile = ({doctor})=>{
    const {name,email,phone, averageRating, photo, specialization, experiences } = doctor.data;
    // console.log(doctorData,'data')

    return(
        <section>
            <div className="max-w-[1170px] mx-auto px-5">
                
                            <div className="pb-[50px] px-[30px] rounded-md">
                                <div className="flex items-center ">
                                    <figure className="w-[300px]   border-2 border-solid border-primaryColor">
                                        <img src={photo} className="w-full h-full rounded-full" alt="" />
                                    </figure>
                                </div>
                                <h2 className="text-[18px] leading-[30px] lg:text[26px] lg:leading-9 text-headingColor font-[700] mt-5 lg:mt-5">{name}</h2>
                                <p className="text-[18px] leading-[30px] lg:text[26px] lg:leading-9 mt-5 lg:mt-5 flex gap-2">
                                    <img src={mailIcon} className='w-[25px]' alt="" />{email}</p>
                                <p className="text-[18px] leading-[30px] lg:text[26px] lg:leading-9 mt-5 lg:mt-5 flex gap-2">
                                    <img src={phoneIcon} className='w-[25px]' alt="" />{phone}
                                </p>
                                <div className="mt-2 lg:mt-4 flex items-center justify-between">
                                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2  lg:py-2 lg:px-6 text-[12px]
                                        leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                                            {specialization}
                                        </span>
                                        <div className="flex items-center gap-[6px] ">
                                            <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                                                <img src={startIcon} alt="" />
                                                {averageRating}
                                            </span>
                                            {/* <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">({totalRating})</span> */}
                                        </div>
                                </div>
                                        <div>
                                            <p className="text-[16px] leading-6  font-[400] text-textColor ">At {experiences && experiences[0]?.hospital} </p>
                                        </div>
                    
                            </div>
                           
                  
                
            </div>
       </section>
    // <div>DoctorProfilr</div>
    )
};

export default DoctorProfile;