// import {doctors} from '../../assets/data/doctors';
import DoctorCard from '../../components/Doctors/DoctorCard';
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from 'react';
const Doctors = () =>{

    const[query, setQuery] = useState('');
    const[debounceQuery,setDebounceQuery] = useState('');
    const { data:doctors, loading , error} = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

    useEffect(()=>{

        const timeout = setTimeout(()=>{
            setDebounceQuery(query)
        },700)
        return ()=> clearTimeout(timeout)
    },[query])

    const handleSearch=()=>{
        setQuery(query.trim())

        console.log('handle Search')
    }

    return (
        <>
        <section className='bg-[#fff9ea]'>
            <div className="container text-center">
                <h2 className='heading'>Tìm kiếm bác sĩ</h2>
                <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex  items-center justify-between">
                    <input 
                    value={query}
                    onChange={e=>setQuery(e.target.value)}
                    type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none
                    cursor-pointer placeholder:text-textColor ' placeholder='Nhạp tên hoặc chuyên môn' />
                    <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handleSearch}>Search</button>
                </div>
            </div>
        </section>
        <section>
            <div className="container">
                
            {loading  && <Loader /> }
            {error  && <Error />}
            { !loading && !error && <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 grap-5 ">
                    {doctors?.map((doctor)=> <DoctorCard key={doctor._id} doctor={doctor}/>)}
                </div>}
            </div>
        </section>
        </>
        
    )
}

export default Doctors