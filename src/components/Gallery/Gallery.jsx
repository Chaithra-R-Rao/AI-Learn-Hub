import React, { useState } from 'react';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css';

const courses = [
  { title: "Robotics", image: `${process.env.PUBLIC_URL}/Images/robot.png`, icon: "fas fa-robot" },
  { title: "Autonomous System", image: `${process.env.PUBLIC_URL}/Images/autonomous-system.png`, icon: "fas fa-car-side" },
  { title: "Machine Learning", image: `${process.env.PUBLIC_URL}/Images/machine-learning.png`, icon: "fas fa-brain" },
  { title: "Generative AI", image: `${process.env.PUBLIC_URL}/Images/genai.jpg`, icon: "fas fa-magic" },
  { title: "Computer Vision", image: `${process.env.PUBLIC_URL}/Images/computer-vision.png`, icon: "fas fa-eye" },
];


export default function PopularCourses() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const moveNext = () =>
    setCurrentImageIndex((currentImageIndex + 1) % courses.length);

  const movePrev = () =>
    setCurrentImageIndex((currentImageIndex + courses.length - 1) % courses.length);

  return (
    <div className="popular-courses-container container my-5 py-5 text-center">
      <h1 className="fw-bold mb-3">Popular AI Technologies</h1>
      <p className="text-muted mb-5">Find the field of study that meets your needs.</p>
      <div className="row g-4 mb-5">
        {courses.map((course, index) => (
          <div className="col-md-4" key={index}>
            <div className="course-card" onClick={() => openLightbox(index)}>
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="overlay">
                <i className={`${course.icon} mb-2`} style={{ fontSize: "2rem" }}></i>
                <h5 className="fw-bold">{course.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={courses[currentImageIndex].image}
          nextSrc={courses[(currentImageIndex + 1) % courses.length].image}
          prevSrc={courses[(currentImageIndex + courses.length - 1) % courses.length].image}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={movePrev}
          onMoveNextRequest={moveNext}
        />
      )}
    </div>
  );
}
