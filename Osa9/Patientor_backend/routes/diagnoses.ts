import diagnoses from "../data/diagnoses";
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(diagnoses);
});

export default router;
