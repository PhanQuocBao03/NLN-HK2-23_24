import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";

const BookingDelete = ({ open, handleClose, bookingId }) => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/bookings/${bookingId}`);
  console.log('check',data)
  const DeleteProfileHandle = async e =>{
    e.preventDefault();
    try {
        const res = await fetch(`${BASE_URL}/bookings/${bookingId}`,{
            method: 'delete',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            
        })
        const result = await res.json();
        toast.success(result.message);
        // navigate('/users/profile/me')

        if(!res.ok){
            throw  Error(result.message)
        }
    } catch (error) {
        toast.error(error.message);
        // setLoading(false);


        
    }
};

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="mx-auto max-w-lg border border-gray-300 shadow-2xl bg-white"
    >
      <DialogHeader className="  text-white justify-center text-[16px] bg-pink-400">
        Xóa lịch hẹn cũ
      </DialogHeader>
      <DialogBody className="p-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.user && (
        <div>
            <p>Bạn có chắc muốn xóa lịch hẹn <span className="text-[18px] font-semibold text-primaryColor">{data.user.name}</span>?</p>
        </div>
        )}
          
      </DialogBody>
      <DialogFooter className="bg-gray-100 justify-end">
        <div className="mt-7 mr-3">
            <button type="submit" onClick={DeleteProfileHandle} className="bg-red-500 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">Xóa</button>
        </div>
        <div className="mt-7">
            <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="bg-green-600 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
            >
            Đóng
            </Button>
        </div>
        
      </DialogFooter>
    </Dialog>
  );
};

export default BookingDelete;
