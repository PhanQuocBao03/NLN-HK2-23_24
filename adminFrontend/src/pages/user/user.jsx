import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from 'react';
import UserTable from "./userTable";


const User = () => {
    const [query, setQuery] = useState('');
    const [debounceQuery, setDebounceQuery] = useState('');
    const { data:users, loading , error} = useFetchData(`${BASE_URL}/users?query=${debounceQuery}`);
    

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceQuery(query);
        }, 700);
        return () => clearTimeout(timeout);
    }, [query]);

    const handleSearch = () => {
        setQuery(query.trim());
    };

    // Filter doctors based on approval status
    

    return (
        <>
            <section className="bg-[#fff9ea]">
                <div className="container text-center">
                    <h2 className="heading">Quản lý Khách hàng</h2>
                    <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex  items-center justify-between">
                        <input
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none
                            cursor-pointer placeholder:text-textColor ' placeholder='Tìm kiếm khách hàng' />
                        <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handleSearch}>Tìm</button>
                    </div>
                </div>
            </section>
            <section className=" p-0">
                {/* <div className="flex items-center container">
                    <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                        <button className={`${tab === 'user' && 'border-b border-solid border-primaryColor'}py-2 px-5  mr-5 text-[16px] leading-7 text-headingColor font-semibold`} onClick={() => setTab('user')}>Khách hàng</button>
                        <button className={`${tab === 'pending' && 'border-b border-solid border-primaryColor'}py-2 px-5  mr-5 text-[16px] leading-7 text-headingColor font-semibold`} onClick={() => setTab('pending')}>Pending</button>
                    </div>
                </div> */}
                <div className="mt-[35px]">
                    <UserTable users={users} />
                    {/* {tab === 'pending' && <DoctorPending doctors={pendingDoctors} />} */}
                </div>
            </section>
        </>
    );
};

export default User;
