import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Chào mừng ! <span className="text-primaryColor">Quản trị viên của hệ thống</span></h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 p-8 rounded-lg text-white flex items-center justify-center">
          <div>
            <div className="text-4xl font-bold">100</div>
            <div className="text-lg">Khách hàng</div>
          </div>
        </div>
        <div className="bg-green-500 p-8 rounded-lg text-white flex items-center justify-center">
          <div>
            <div className="text-4xl font-bold">50</div>
            <div className="text-lg">Bác sĩ</div>
          </div>
        </div>
        
        <div className="bg-red-500 p-8 rounded-lg text-white flex items-center justify-center">
          <div>
            <div className="text-4xl font-bold">10</div>
            <div className="text-lg">Lịch khám</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
