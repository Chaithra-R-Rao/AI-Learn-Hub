import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PopularCourses.css";
 
const courses = [
{ title: "Creative Art & Design", image: "/Images/Robot.png", icon: "fas fa-palette" },
{ title: "Business & Management", image: "/Images/Robot.png", icon: "fas fa-chart-line" },
{ title: "Language & Cultures", image: "/Images/Robot.png", icon: "fas fa-globe" },
{ title: "Health & Psychology", image: "/Images/Robot.png", icon: "fas fa-briefcase-medical" },
{ title: "Web Development", image: "/Images/Robot.png", icon: "fas fa-code" },
{ title: "Sciences & Research", image: "/Images/Robot.png", icon: "fas fa-atom" },
];
 
const PopularCourses = () => {
  return (
    <div className="popular-courses-container container my-5 py-5 text-center">
      <h1 className="fw-bold mb-3">AI Technologies</h1>
      <p className="text-muted mb-5">Find the field of study that meets your needs.</p>
 
      <div className="row g-4 mb-5">
        {courses.map((course, index) => (
          <div className="col-md-4" key={index}>
            <div className="course-card position-relative overflow-hidden rounded shadow">
              <img
                src={course.image}
                alt={course.title}
                className="w-100 h-100"
              />
              <div className="overlay d-flex flex-column justify-content-center align-items-center text-white">
                <i className={`${course.icon} mb-2`} style={{ fontSize: "2rem" }}></i>
                <h5 className="fw-bold">{course.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
 
      {/* <div className="p-4 download-section rounded">
        <p className="text-muted mb-0">
          Explore more about the fields and available courses by downloading the full list in PDF format.
        </p>
      </div> */}
    </div>
  );
};
 
export default PopularCourses;