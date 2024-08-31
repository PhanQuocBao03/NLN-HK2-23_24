import Patient from "../models/PatientSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const getPatient = async (req, res) => {
        const id = req.params.id;
    try {
        const patient = await Patient.findById(id).populate('user').populate('doctor');
        res.status(200).json({ success: true, message: "Patient found", data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
export const createPatient = async (req, res) => {
    try {
       
        const { doctorId,userId, dateOfExamination, symptoms, diagnosis, medications, additionalInstructions, notes } = req.body;

        // Tạo một bệnh án mới với thông tin được cung cấp
        const medicalRecord = await Patient.create({
            doctor: doctorId,
            user: userId,
            dateOfExamination,
            symptoms,
            diagnosis,
            medications,
            additionalInstructions,
            notes
        });

        return res.status(201).json({ success: true, message: 'Medical record created successfully', data: medicalRecord });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to create medical record', error: error.message });
    }
};
export const getAll = async(req,res)=>{
    try {
        const {query} = req.query;
        let patients;
        if(query){
            patients = await Patient.find({
            $or:[
                {user:{name: {$regex: query, $options: 'i'}}},
                {specialization:{$regex:query,$options:'i'}}
            ],
        }).select('-password');
        }else{
             patients = await Patient.find().select('-password');

        }
        res.status(200).json({success:true,message:"Doctors found",data: patients});
    } catch (error) {
        res.status(404).json({success:false,message:"Not found"});
        
    }
   

}

