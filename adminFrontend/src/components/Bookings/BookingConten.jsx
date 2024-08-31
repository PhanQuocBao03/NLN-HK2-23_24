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

const BookingConten = ({ open, handleClose, bookingId }) => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/bookings/${bookingId}`);
  console.log('check',data)
  
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
        Tình trạng
      </DialogHeader>
      <DialogBody className="p-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.user && (
        <div>
            <textarea  id=""  className="w-full  py-3 text-[16px] border-b border-solid border-[#0066ff61] focus:outline-none
                    placeholder:text-textColor  cursor-pointer">{data.note}</textarea>
        </div>
        )}
          
      </DialogBody>
      <DialogFooter className="bg-gray-100 justify-end">
        
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

export default BookingConten;
