const express = require("express");
const mongoose = require("mongoose");
const {
  addCourse,
  countCourses,
  getCourses,
  getCourseById,
  NotBACourses,
  serverOrClientCourses,
  byPriceOrStringCourses,
  updateCoursePrice,
  deleteFreeCourses,
} = require("./courseController");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000; // אם לא מוגדר ב־.env, ישתמש ב־3000

app.get("/", (req, res) => {
  res.send(" success! ");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// חיבור ל־MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Successfully connected to MongoDB");

    const courseData = {
      name: "NodeJS",
      price: 550,
      topics: ["server", "MongoDB"],
      date: new Date("2025-04-20"),
      isForBa: false,
    };

    // הוספת קורס
    await addCourse(courseData);
    
    // עכשיו אתה יכול להשתמש ב-async/await כדי להמתין לכל פעולה:
    const count = await countCourses(); // המתחיל כעת תוצאה מתוך Promise
    console.log("Count of courses:", count);  // הדפסת התוצאה
    
    const courses = await getCourses();
    console.log("All courses:", courses);  // הדפסת כל הקורסים
    
    const courseById = await getCourseById("6805dd482dd4b12c2d5498a5");
    console.log("Course by ID:", courseById);  // הדפסת קורס לפי מזהה
    
    const notBACourses = await NotBACourses();
    console.log("Not for BA courses:", notBACourses);  // הדפסת קורסים שלא מיועדים לתואר
    
    const serverOrClientCoursesResult = await serverOrClientCourses();
    console.log("Server or Client courses:", serverOrClientCoursesResult);  // הדפסת קורסים של שרת או לקוח
    
    const priceOrStringCourses = await byPriceOrStringCourses();
    console.log("Courses by price or string:", priceOrStringCourses);  // הדפסת קורסים לפי מחיר או שם
    
    const updatedCourse = await updateCoursePrice("680e7ab9d9e86d3c207f993d", 0);
    console.log("Updated course:", updatedCourse);  // הדפסת קורס מעודכן
    
    await deleteFreeCourses();  // הדפסת מספר הקורסים שנמחקו
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));
