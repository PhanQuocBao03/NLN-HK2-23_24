import { useState, useEffect } from 'react';

export const formateDate = (date, config)=>{
    const defaultOptions ={ day: "numeric",month:"short",year:"numeric"}
    const options = config ? config:defaultOptions;
    return new Date(date).toLocaleDateString('en-US',options)
};

export const toDay =()=>{
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
    // Lấy ngày hiện tại
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const yyyy = today.getFullYear();

    const formattedDate = dd + '-' + mm + '-' + yyyy;

    // Đặt giá trị mặc định cho input type="date"
    setCurrentDate(formattedDate);
  }, []);
};