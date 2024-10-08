const mongoose = require("mongoose");
const express = require("express");
const { User, Course, Admin } = require("../db");
const jwt = require("jsonwebtoken");
const { authenticateJwt } = require("../middleware/auth");
const SECRET = process.env.secret;

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findById(req.user.id);
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();

      const token = jwt.sign({ id: newAdmin._id, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  }
  Admin.findOne({ username }).then(callback);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ id: admin._id, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", authenticateJwt, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id); // Assuming req.user contains the authenticated admin's ID

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const course = new Course(req.body);
    await course.save();

    admin.createdCourses.push(course._id);
    await admin.save();

    res.json({ message: "Course created successfully", courseId: course.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to create course", error });
  }
});

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).populate("createdCourses");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ courses: admin.createdCourses });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error });
  }
});

router.get("/course/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

router.delete("/delete/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const temp = await Course.deleteOne({ _id: courseId });
  if (temp.deletedCount > 0) {
    res.json({ message: "Course deleted successfully!" });
  } else {
    res.status(403).json({ message: "Course not found" });
  }
});
//if frontend gets response with status code of 400 and above catch(err) block executes
module.exports = router;
