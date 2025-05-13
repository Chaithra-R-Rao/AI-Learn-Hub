import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mentors.css";
import Carousel from "react-bootstrap/Carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const mentors = [
    { id: 1, name: "Jack Thomson", title: "President", image: `${process.env.PUBLIC_URL}/Images/Photo1.png` },
    { id: 2, name: "Emily Carter", title: "Mentor", image: `${process.env.PUBLIC_URL}/Images/Photo2.png` },
    { id: 3, name: "Sarah Parker", title: "Senior Mentor", image: `${process.env.PUBLIC_URL}/Images/Photo3.png` },
    { id: 4, name: "Alex Johnson", title: "Junior Mentor", image: `${process.env.PUBLIC_URL}/Images/Photo4.png` },
];

const Mentors = () => {
    return (
        <div className="mentors-container container-fluid text-center position-relative">
            <h1 className="fw-bold mb-3">Our teachers and mentors</h1>
            <p className="text-muted mb-5">We work hard to help you achieve your goals.</p>

            <Carousel
                indicators={false}
                interval={3000}
                controls={true}
                prevIcon={<FaChevronLeft className="carousel-control-prev-icon-custom" />}
                nextIcon={<FaChevronRight className="carousel-control-next-icon-custom" />}
            >
                {mentors.map((mentor, index) => {
                    const prevIndex = (index - 1 + mentors.length) % mentors.length;
                    const nextIndex = (index + 1) % mentors.length;

                    return (
                        <Carousel.Item key={mentor.id}>
                            <div className="d-flex justify-content-center align-items-center position-relative">
                                <div className="mentor-image-wrapper small-circle">
                                    <img src={mentors[prevIndex].image} alt={mentors[prevIndex].name} className="mentor-image" />
                                </div>

                                <div className="mentor-image-wrapper large-circle mx-4">
                                    <img src={mentor.image} alt={mentor.name} className="mentor-image" />
                                </div>

                                <div className="mentor-image-wrapper small-circle">
                                    <img src={mentors[nextIndex].image} alt={mentors[nextIndex].name} className="mentor-image" />
                                </div>
                            </div>

                            <div className="mentor-details mt-4">
                                <h5 className="fw-bold">{mentor.name}</h5>
                                <p className="text-muted">{mentor.title}</p>
                            </div>
                        </Carousel.Item>
                    );
                })}
            </Carousel>

            {/* Floating Dots */}
            <div className="floating-dot dot1"></div>
            <div className="floating-dot dot2"></div>
            <div className="floating-dot dot3"></div>
            <div className="floating-dot dot4"></div>
        </div>
    );
};

export default Mentors;
