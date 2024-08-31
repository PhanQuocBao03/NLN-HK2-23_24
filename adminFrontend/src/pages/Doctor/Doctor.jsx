import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from 'react';
import DoctorApproved from "./Doctor_approved";
import DoctorPending from "./Doctor_pending";

const Doctor = () => {
    const [query, setQuery] = useState('');
    const [tab, setTab] = useState('approved'); 
    const [debounceQuery, setDebounceQuery] = useState('');
    const { data:doctors, loading , error} = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

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
    const approvedDoctors = doctors.filter(doctor => doctor.isApproved === 'approved');
    const pendingDoctors = doctors.filter(doctor => doctor.isApproved === 'pending');

    return (
        <>
            <section className="bg-[#fff9ea]">
                <div className="container text-center">
                    <h2 className="heading">Quản lý Bác Sĩ</h2>
                    <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex  items-center justify-between">
                        <input
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none
                            cursor-pointer placeholder:text-textColor ' placeholder='Seach doctors by name or specification' />
                        <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </section>
            <section className=" p-0">
                <div className="flex items-center container">
                    <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                        <button className={`${tab === 'approved' && 'border-b border-solid border-primaryColor'}py-2 px-5  mr-5 text-[16px] leading-7 text-headingColor font-semibold`} onClick={() => setTab('approved')}>Xán nhận</button>
                        <button className={`${tab === 'pending' && 'border-b border-solid border-primaryColor'}py-2 px-5  mr-5 text-[16px] leading-7 text-headingColor font-semibold`} onClick={() => setTab('pending')}>Pending</button>
                    </div>
                </div>
                <div className="mt-[35px]">
                    {tab === 'approved' && <DoctorApproved doctors={approvedDoctors} />}
                    {tab === 'pending' && <DoctorPending doctors={pendingDoctors} />}
                </div>
            </section>
        </>
    );
};

export default Doctor;
