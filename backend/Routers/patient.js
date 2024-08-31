import express from "express";
import {authenticate,restrict } from "../auth/verifyToken.js";
import { createPatient, getAll, getPatient} from "../Controllers/patientController.js";


const router = express.Router();

router.get("/:id",getPatient)
router.post("/:userId",authenticate,restrict(['doctor']),createPatient);
router.get("/",getAll)


export default router