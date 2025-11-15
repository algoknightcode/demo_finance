import express from "express";
import { registerUser, loginUser, getUserInfo } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Add debug logging middleware
router.use((req, res, next) => {
    console.log(`Auth Route accessed: ${req.method} ${req.originalUrl}`);
    next();
});

router.post("/register", registerUser);
router.post("/login", loginUser);
// Emphasize this is a GET route
router.get("/getUser", protect, (req, res, next) => {
    console.log("GetUser route hit with token:", req.headers.authorization);
    next();
}, getUserInfo);


router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({ imageUrl });
});

export default router;
