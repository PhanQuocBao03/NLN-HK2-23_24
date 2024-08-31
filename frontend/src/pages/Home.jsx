import React from "react";
import heroImg01 from '../assets/images/hero-img01.png';
import heroImg02 from '../assets/images/hero-img02.png';
import heroImg03 from '../assets/images/hero-img03.png';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import featureImg from '../assets/images/feature-img.png';
import videoIcon from '../assets/images/video-icon.png';
import avatarIcon from '../assets/images/avatar-icon.png';
import faqImg from '../assets/images/faq-img.png'
import { Link } from "react-router-dom";
import {BsArrowRight} from 'react-icons/bs';
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
// import FaqItem from "../components/Faq/FaqItem";






const Home = () =>{
    return( <>
        
        <section className="hero__section pt-[60px] 2xl:h-[800px]">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                    <div>
                        <div className="lg:w-[570px]">
                            <h1 className="text-[36px] leading-[46px]  text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                            Chúng tôi giúp bạn sống khỏe, sống đẹp.
                            </h1>
                            <p className="text__para">Không chăm sóc cho bạn tốt hơn bạn !</p>
                            

                        </div>
                        {/* ===================== */}
                        
                        
                    </div>

                    <div className="flex gap-[30px] justify-end">
                        <div>
                            <img src={heroImg01} className="w-full" alt="" />
                        </div>
                        <div className="mt-[30px]">
                            <img src={heroImg02} className="w-[300px] rounded-[10px] mb-[30px]" alt="" />
                            <img src={heroImg03} className="w-[300px] rounded-[10px] " alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* end hero__section */}
        <section class="py-10 px-4 lg:px-0">
    <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">5 Bước Rữa Tay Chuẩn Y Tế</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="flex items-start">
                <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">1</div>
                <div>
                    <h3 class="text-xl font-bold mb-2">Bước 1: Ướt tay với nước sạch</h3>
                    <p>Chảy nước và ướt tay của bạn với nước sạch.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">2</div>
                <div>
                    <h3 class="text-xl font-bold mb-2">Bước 2: Áp dụng xà phòng</h3>
                    <p>Lấy một lượng xà phòng đủ vào lòng bàn tay và phân tán đều lên cả hai bề mặt của tay.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">3</div>
                <div>
                    <h3 class="text-xl font-bold mb-2">Bước 3: Rửa tay kỹ</h3>
                    <p>Chà tay của bạn với nhau trong ít nhất 20 giây. Đảm bảo bạn rửa kỹ cả bên trong, bên ngoài, cả giữa ngón tay và dưới móng tay.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">4</div>
                <div>
                    <h3 class="text-xl font-bold mb-2">Bước 4: Xả nước và lau khô</h3>
                    <p>Xả nước sạch để loại bỏ xà phòng, sau đó lau khô tay của bạn bằng khăn sạch hoặc khăn giấy.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">5</div>
                <div>
                    <h3 class="text-xl font-bold mb-2">Bước 5: Sử dụng dung dịch sát khuẩn</h3>
                    <p>Nếu không có nước và xà phòng, sử dụng dung dịch sát khuẩn chứa ít nhất 60% cồn để lau sạch tay của bạn.</p>
                </div>
            </div>
        </div>
    </div>
</section>

        
        {/* <About/> */}

        {/* <section>
            <div className="container">
                <div className="xl:w-[470px] mx-auto">
                    <h2 className="heading text-center">Our medical service</h2>
                    <p className="text__para text-center">
                        World-class care for everyone. Our health  Systems
                        offers umatched, expect health care.
                    </p>
                </div>
                <ServiceList/>
            </div>
        </section> */}
        {/* <section>
            <div className="container">
                <div className="flex items-center justify-between  flex-col lg:flex-row">
                    <div className="xl:w-[670px]">
                        <h2 className="heading">Get virtual treament <br/> anytime</h2>
                        <ul className="pl-4">
                            <li className="text__para">1. Schedule  the appointment directly.</li>
                            <li className="text__para">2. Schedule  the appointment directly.</li>
                            <li className="text__para">3. Schedule  the appointment directly.</li>
                        </ul>
                        <Link to={'/'}>
                            <button className="btn">Learn more</button>
                        </Link>
                    </div>
                    <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px]  lg:mt-0">
                        <img src={featureImg} className="w-3/4" alt="" />
                        <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20  p-2 pb-3 lg:pt-4 
                        lg:px-4 lg:pb-[26px] rounded-[10px] ">

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-[6] lg:gap-[3]">
                                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">Tue, 24</p>
                                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">10:00AM</p>
                                </div>
                                <div className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                                    <img src={videoIcon} alt="" />
                                </div>
                                
                            </div>

                            <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px]
                            tex-[8px] leading-8 lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-2 rounded-full">
                                Consultation
                            </div>
                            <div className="flex items-center gap-[6px] lag;gap-[10px] mt-2 lg:mt-[18px]">
                                <img src={avatarIcon} alt="" />
                                <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">Wayne Collins</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

        <section>
            <div className="container">
                <div className="xl:w-[470px] mx-auto">
                    <h2 className="heading text-center">Bác sĩ nỗi bật</h2>
                    <p className="text__para text-center">
                        Cung cấp hệ thống y tế chuẩn quóc tế, trang thiệt bị hiện đại, các bác sĩ nỗi tiếng trong khu vực.
                    </p>
                </div>
                <DoctorList />
            </div>
        </section>
        {/* =========FaQ ===================*/}
        <div className="container">
    <div className="flex justify-between gap-[50px] lg:gap-0">
        <div className="w-1/2 hidden md:block"><img src={faqImg} alt="" /></div>
        <div className="w-full md:w-1/2">
            <div className="">
                <h2 className="heading">Lịch sử hình thành</h2>
                <p className="text_para text-justify text-[16px]" >
                Phòng khám Hoa Hồng được thành lập vào một buổi sáng mùa thu yên bình của năm 1995. Ông Nguyễn Văn A, một bác sĩ nhi khoa tận tâm và giàu kinh nghiệm, là người sáng lập ra cơ sở y tế này với mong muốn mang lại sự chăm sóc sức khỏe tốt nhất cho cộng đồng địa phương.

Ban đầu, phòng khám chỉ là một căn phòng nhỏ nằm trong một khu vực ngoại ô của thành phố, chỉ có một vài bác sĩ và nhân viên y tế. Tuy nhiên, với lòng nhiệt huyết và quyết tâm vươn xa, ông A đã dần dần mở rộng quy mô của phòng khám và cung cấp thêm nhiều dịch vụ y tế đa dạng.

Trải qua những năm tháng đầy thách thức, phòng khám Hoa Hồng đã không ngừng phát triển. Đội ngũ y bác sĩ và nhân viên y tế đã không ngừng nỗ lực để nâng cao chất lượng phục vụ và đáp ứng mọi nhu cầu y tế của bệnh nhân. Cơ sở vật chất của phòng khám cũng được nâng cấp và mở rộng, bao gồm cả việc trang bị các thiết bị y tế tiên tiến và hiện đại nhất.

Nhờ vào sự cam kết không ngừng nghỉ của đội ngũ y bác sĩ và nhân viên y tế, cũng như sự tin tưởng và ủng hộ của cộng đồng, phòng khám Hoa Hồng đã trở thành một điểm đến uy tín và được người dân địa phương tin cậy trong việc chăm sóc sức khỏe. Đặc biệt, phòng khám đã nổi tiếng với dịch vụ khám và điều trị trẻ em chất lượng cao, giúp mang lại niềm vui và sức khỏe cho nhiều gia đình.

Hiện nay, phòng khám Hoa Hồng không chỉ là một cơ sở y tế mà còn là một biểu tượng của sự chăm sóc sức khỏe và lòng nhiệt huyết y học. Với mục tiêu tiếp tục phục vụ cộng đồng và nâng cao chất lượng dịch vụ y tế, phòng khám Hoa Hồng sẽ tiếp tục phát triển và trở thành điểm đến lý tưởng cho sức khỏe của mọi người.

</p>
            </div>
        </div>
    </div>
</div>

    </>
    );
};

export default Home