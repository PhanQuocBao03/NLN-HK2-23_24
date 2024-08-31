import { formateDate } from "../../utils/fomateDay";

const DoctorAbout=({name, about, qualifications, experiences})=>{
    return(
        <div>
            <div>
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
                    About of
                <span className="text-irisBlueColor font-bold text-[24px] leading-9">{name}</span>
                </h3>
                <p className="text__para">{about}</p>
            </div>
            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold ">
                    Education
                </h3>
                <ul className="pt-4 md:p-5">
                    {qualifications?.map((items, index)=>(
                        <li key={index} className="flex flex-col sm:flex-row  sm:justify-between sm:itens-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semiblod">
                                    {formateDate(items.startingDate)} - {formateDate(items.endingDate)}
                                </span>
                                <p className="text-[16px] font-medium text-textColor leading-6">{items.degree}</p>
                            </div>
                            <p className="text-[14px] font-medium text-textColor leading-5">{items.university}</p>

                        </li>
                    ))}
                    
                    
                </ul>
            </div>
            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold ">
                    Experience
                </h3>
                <ul className="grid sm:grid-cosl-2 gap-[30px] pt-4  md:p-5">
                        {experiences?.map((item, index)=>(
                        <li key={index}  className="p-4 rounded bg-[#fff9ea]">
                            <span className="text-yellowColor text-[15px] leading-6  font-semibold">
                            {formateDate(item.startingDate)} - {formateDate(item.endingDate)}


                            </span>
                            <p className="text-[16px] font-medium text-textColor leading-6">{item.position}</p>
                            <p className="text-[14px] font-medium text-textColor leading-5">{item.hospital}</p>

                        </li>
                     ))}
                    
                    
                </ul>
                
            </div>

        </div>

        
    );
};

export default DoctorAbout;