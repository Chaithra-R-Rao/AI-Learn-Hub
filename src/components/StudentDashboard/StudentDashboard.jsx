import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.error("Student not logged in!");
      return;
    }
    setStudent(user);
    fetchCourses();
    fetchEnrollments(user.id);
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const fetchEnrollments = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:5000/enrolled-courses?studentId=${studentId}`);
      setEnrollments(res.data);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  };

  const handleEnroll = async (courseId) => {
    const alreadyEnrolled = enrollments.some((e) => e.courseId === courseId);
    if (alreadyEnrolled) {
      toast.info("Already enrolled in this course!");
      return;
    }

    const newEnrollment = {
      studentId: student.id,
      courseId,
    };

    try {
      await axios.post("http://localhost:5000/enrolled-courses", newEnrollment);
      toast.success("Enrolled successfully!");
      fetchEnrollments(student.id);
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error("Failed to enroll.");
    }
  };

  // Join: get course details for each enrollment
  const enrolledCourses = enrollments
    .map((e) => courses.find((c) => c.id === e.courseId))
    .filter(Boolean);

  return (
    <div className="container my-5">
      <ToastContainer />
      <h2 className="text-center mb-4">Welcome {student?.name}</h2>


      <h4 className="mb-3">Your Enrolled Courses</h4>
      <div className="row">
        {enrolledCourses.length === 0 && <p>You have not enrolled in any courses yet.</p>}
        {enrolledCourses.map((course) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <div className="card h-100 shadow-sm">
              {course.image && (
                <img
                  src={course.image}
                  className="card-img-top"
                  alt="Course"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text"><strong>Author:</strong> {course.author}</p>
                <p className="card-text"><strong>Price:</strong> ${course.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-5" />

      <h4 className="mb-3">Available Courses</h4>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <div className="card h-100 shadow-sm">
              {course.image && (
                <img
                  src={course.image}
                  className="card-img-top"
                  alt="Course"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p><strong>Author:</strong> {course.author}</p>
                <p><strong>Price:</strong> ${course.price}</p>
                <button
                  className="btn btn-success w-100"
                  onClick={() => handleEnroll(course.id)}
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudentDashboard;
