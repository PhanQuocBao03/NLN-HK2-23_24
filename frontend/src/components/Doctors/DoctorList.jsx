import DoctorCard from './DoctorCard.jsx';
import { BASE_URL } from '../../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';

const DoctorList = () => {

    const { data:doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);
    console.log(doctors,'check')
    return (
        <>
            {loading  && <Loader /> }
                {error  && <Error />}
                { !loading && !error && 
                    (<div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 grap-5 ">
                        {doctors.map((doctor)=> (
                            <DoctorCard key={doctor._id} doctor={doctor}/>
                        ))}
                    </div>)}
        </>
    )
};

export default DoctorList;
