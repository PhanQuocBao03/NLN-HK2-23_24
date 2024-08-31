import React from "react";
import {services} from '../../assets/data/services';
import ServiceCard from './ServiceCard'


const ServiceList = () =>{
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grap-5 lg:grap-[30px] mt-[30px] lg:mt-[55px]">
            {
                services.map((item,index)=>(
                    <ServiceCard item={item} index={index} key={index} />
                ))
            }
        </div>
    )
}

export default ServiceList