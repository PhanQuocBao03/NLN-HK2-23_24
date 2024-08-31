import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";

const DoctorDialog = ({ open, handleClose, doctorId }) => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/doctors/${doctorId}`);

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
        Thông tin thời gian của bác sĩ
      </DialogHeader>
      <DialogBody className="p-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <table className="w-full border-collapse text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Ngày</th>
                <th className="p-2">Bắt đầu</th>
                <th className="p-2">Kết thúc</th>
              </tr>
            </thead>
            <tbody>
              {data.timeSlots?.map((time, index) => (
                <tr key={index} className="text-textColor">
                  <td className="p-2">{time.day}</td>
                  <td className="p-2">{time.startingTime}</td>
                  <td className="p-2">{time.endingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DialogBody>
      <DialogFooter className="bg-gray-100 justify-end">
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="text-white btn"
        >
          Đóng
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DoctorDialog;
