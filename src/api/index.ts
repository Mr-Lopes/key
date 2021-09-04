import express from "express";
import realstateApi from "./v1/realstate";

const router = express.Router();

router.use(realstateApi);

export default router;