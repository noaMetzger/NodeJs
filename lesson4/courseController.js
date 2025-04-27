const Course = require("./course");

function addCourse(courseData) {
    const course = new Course(courseData);
    return course.save();  // מחזיר את ה-Promise של ה-save
}

function countCourses() {
    return Course.countDocuments()
        .then((count) => {
            return count;  // מחזיר את התוצאה
        })
        .catch((err) => {
            console.error(err.message);
        });
}

function getCourses() {
    return Course.find()
        .then((courses) => {
            return courses;  // מחזיר את התוצאה
        })
        .catch((err) => {
            console.error(err.message);
        });
}

function getCourseById(courseId) {
    return Course.findById(courseId)
        .then((course) => {
            if (!course) {
                console.log("There is no course with this code");
                return null;  // מחזיר null אם לא נמצא
            } else {
                return course;  // מחזיר את הקורס אם נמצא
            }
        })
        .catch((err) => {
            console.error(err.message);
        });
}

function NotBACourses() {
    return Course.find({
        isForBA: true,
        topics: "server",
    })
        .sort({ name: -1 })
        .select({ name: 1, teacher: 1 })
        .then((courses) => {
            return courses;  // מחזיר את התוצאה
        })
        .catch((err) => {
            console.error(err.message);
        });
}

function serverOrClientCourses() {
    return Course.find({
        topics: { $in: ["server", "client"] },
    })
        .sort({ price: 1 })
        .select({ name: 1, teacher: 1 })
        .then((courses) => {
            return courses;  // מחזיר את התוצאה
        })
        .catch((err) => {
            console.error(err.message);
        });
}

function byPriceOrStringCourses() {
    return Course.find({
        $or: [{ price: { $gte: 15 } }, { name: "/וה/" }],
    })
        .then((courses) => {
            return courses;  // מחזיר את התוצאה
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function updateCoursePrice(courseId, newPrice) {
    return Course.findByIdAndUpdate(courseId, { price: newPrice }, { new: true })
        .then((updatedCourse) => {
            if (!updatedCourse) {
                console.log("The course is not exists");
                return null;  // מחזיר null אם לא נמצא
            }
            console.log("The price updated");
            console.log(updatedCourse);
            return updatedCourse;  // מחזיר את הקורס המעודכן
        })
        .catch((err) => {
            console.error(err.message);
        });
}

function deleteFreeCourses() {
    return Course.deleteMany({ price: 0 })
        .then((result) => {
            console.log(result.deletedCount + " Free courses were deleted");
            return result.deletedCount;  // מחזיר את מספר הקורסים שנמחקו
        })
        .catch((err) => {
            console.error(err.message);
        });
}

module.exports = {
    addCourse,
    countCourses,
    getCourses,
    getCourseById,
    NotBACourses,
    serverOrClientCourses,
    byPriceOrStringCourses,
    updateCoursePrice,
    deleteFreeCourses,
};
