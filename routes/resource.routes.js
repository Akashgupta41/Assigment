import express from "express";
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";


const router = express.Router();

router.post(
  "/create",
  checkAuth,
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Title is required"),
  checkRole("Admin"),
  createResource
);
router.get("/all", checkAuth, getAllResources);
router.get("/byId/:id", checkAuth, getResourceById);
router.put("/update/:id", checkAuth, checkRole("Admin"), updateResource);
router.delete("/delete/:id", checkAuth, checkRole("Admin"), deleteResource);

export default router;
