/* eslint-disable import/no-named-as-default-member */
import express from "express";
import authMiddleWare from "../middleware/auth";
import datacontroller from "../controllers/department.controller";

const router = express.Router();

console.log("In Department Router");

router.get("/", authMiddleWare.verifyRequest, datacontroller.onReadAll);
router.get("/:id", authMiddleWare.verifyRequest, datacontroller.onReadOne);
router.post("/", authMiddleWare.verifyRequest, datacontroller.onCreateOne);
router.put("/:id", authMiddleWare.verifyRequest, datacontroller.onEditOne);
router.delete("/:id", authMiddleWare.verifyRequest, datacontroller.onDeleteOne);

export default router;
