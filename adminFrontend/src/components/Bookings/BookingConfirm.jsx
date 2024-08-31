import React, { useEffect, useState } from "react";
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

const BookingConfirm = ({ open, handleClose, bookingId }) => {
  const { data: bookingData, loading, error } = useFetchData(`${BASE_URL}/bookings/${bookingId}`);
  const [formData, setFormData] = useState({
    isApproved: '',
  });

  useEffect(() => {
    if (bookingData) {
      setFormData({
        isApproved: bookingData.isApproved,
      });
    }
  }, [bookingData]);

  const updateIsApproved = async (e) => {
    e.preventDefault();
    try {
      if (!bookingData) {
        throw new Error('Booking data not available');
      }

      const updatedBookingData = { ...bookingData, isApproved: 'approved' };

      const res = await fetch(`${BASE_URL}/bookings/${bookingData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBookingData),
      });
      
      if (!res.ok) {
        throw new Error('Confirmation failed');
      }

      toast.success('Booking confirmed successfully');
      handleClose(); // Close dialog after successful update
    } catch (error) {
      toast.error('Failed to confirm booking');
      console.error('Error confirming booking:', error.message);
    }
  };

  return (
    <Dialog
      size="lg"
      open={open}
      onClose={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="mx-auto max-w-lg border border-gray-300 shadow-2xl bg-white"
    >
      <form onSubmit={updateIsApproved}>
        <DialogHeader className="text-white justify-center text-[16px] bg-pink-400">
          Confirm Booking
        </DialogHeader>
        <DialogBody className="p-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {bookingData && bookingData.user && (
            <div>
                <p>
                Xác nhận khác hàng {" "}
                <span className="text-[18px] font-semibold text-primaryColor">
                    {bookingData.user.name}
                </span>{" "}đã khám bệnh
                ?
                </p>
            </div>
            )}

        </DialogBody>
        <DialogFooter className="bg-gray-100 justify-end">
          <div className="mt-7 mr-3">
            <button
              type="submit"
              className="bg-green-600 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
            >
              Xác nhận
            </button>
          </div>
          <div className="mt-7">
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="text-white bg-red-500 text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
            >
              Đóng
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default BookingConfirm;
