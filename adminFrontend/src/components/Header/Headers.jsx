import { useEffect, useRef, useContext } from "react";
import logo from "../../assets/images/logo.png";
import logOutIcon from "../../assets/images/logouticon.webp";
import bookingIcon from "../../assets/images/bookingIcon.webp";
import userIcon from "../../assets/images/iconUser.png";
import doctorIcon from "../../assets/images/iconDoctor.png";
import iconDashboard from "../../assets/images/cloudIcon.webp";
import { authContext } from "../../context/AuthContext";

import {NavLink,Link } from "react-router-dom";


const navLinks = [
  {
    path: '/user',
    icon: <img src={userIcon} className="w-full" alt="" />,
    display: 'Khách Hàng'
  },
  {
    path: '/doctor',
    icon: <img src={doctorIcon} className="w-full" alt="" />,
    display: 'Bác Sĩ'
  },
  {
    path: '/booking',
    icon: <img src={bookingIcon} className="w-full" alt="" />,
    display: 'Lịch Khám'
  },
];

const Headers = () =>{
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const{user, role, token} = useContext(authContext);
  
  const handleStickyHeader = ()=>{
      window.addEventListener('scroll',()=>{
          if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
              headerRef.current.classList.add('sticky__header')
          }
          else{
              headerRef.current.classList.remove('sticky__header')
          }
      })
  }
  useEffect(()=>{
      handleStickyHeader()
      return()=> window.removeEventListener('scroll',handleStickyHeader)
  });
  const toggleMenu =()=> menuRef.current.toggle('show__menu');



  return (
    <header className="header bg-pink-400 h-full" ref={headerRef}>
      <div className="container h-full flex-col items-center justify-between px-4">
        <div className="logo my-5">
          <img src={logo} alt="Logo" />
        </div>
        <div className="dashboard flex items-center my-5">
          <Link to={'/home'}>
          <img src={iconDashboard} className="w-10 h-auto mr-2" alt="Dashboard Icon" />
          <div className="text-white font-semibold text-2xl">Dashboard</div>
          </Link>
        </div>
        <hr />
        <nav className="navigation hidden md:flex items-center">
          <ul className="menu flex-col gap-4">
            {navLinks.map((link, index) => (
              <li key={index} className="mx-5 my-10">
                <NavLink
                  to={link.path}
                  className={navClass => navClass.isActive
                    ? "text-primaryColor text-[16px] leading-7 font-[600] flex items-center"
                    : "text-white text-[16px] leading-7 font-[500] hover:text-primaryColor flex items-center"
                }
                  activeClassName="text-primaryColor"
                >
                  <div className="w-[28px]">{link.icon}</div>
                  <span className="ml-2 text-[18px]">{link.display}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <hr />
        <div className="flex itmes-center gap-4">
                        {
                            token && user ? <div className="logout flex items-center my-5">
                            <img src={logOutIcon} alt="Logout Icon" className="w-10 h-auto mr-2" />
                            <div className="text-white font-semibold text-2xl">Đăng Xuất</div>
                          </div>
                          
                       :<Link to='/login'>
                            <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center
                            justify-center rounded-[50px] ">Login</button>
                        </Link>
                        }
                    
                        
                        

                    </div>
        
      </div>
    </header>
  );
}

export default Headers;
