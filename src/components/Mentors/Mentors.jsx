import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mentors.css";
import Carousel from "react-bootstrap/Carousel";

// Dummy mentor data
const mentors = [
    { id: 1, name: "Jack Thomson", title: "President", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Emily Carter", title: "Mentor", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Alex Johnson", title: "Senior Mentor", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Sarah Parker", title: "Junior Mentor", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Michael Brown", title: "Teacher", image: "https://via.placeholder.com/150" }
];

const Mentors = () => {
    return (
        <div className="mentors-container container my-5 py-5 text-center position-relative">
            <h1 className="fw-bold mb-3">Our teachers and mentors</h1>
            <p className="text-muted mb-5">We work hard to help you achieve your goals.</p>

            <Carousel indicators={false} controls={true} interval={null} className="mentor-carousel">
                {mentors.map((mentor, index) => (
                    <Carousel.Item key={mentor.id}>
                        <div className="d-flex justify-content-center align-items-center position-relative">
                            {index > 0 && (
                                <div className="mentor-image-wrapper small-circle">
                                    <img src={mentors[index - 1].image} alt={mentors[index - 1].name} className="mentor-image" />
                                </div>
                            )}
                            <div className="mentor-image-wrapper large-circle mx-4">
   <img src={mentor.image} alt={mentor.name} className="mentor-image" />
                            </div>
                            {index < mentors.length - 1 && (
                                <div className="mentor-image-wrapper small-circle">
                                    <img src={mentors[index + 1].image} alt={mentors[index + 1].name} className="mentor-image" />
                                </div>
                            )}
                        </div>
                        <div className="mentor-details mt-4">
                            <h5 className="fw-bold">{mentor.name}</h5>
                        <p className="text-muted">{mentor.title}</p>
                        <p className="text-muted">Your text</p>
                    </div>
          </Carousel.Item>
        ))}
        </Carousel>
 
      {/* Decorative Floating Dots */ }
      <div className="floating-dot dot1"></div>
      <div className="floating-dot dot2"></div>
      <div className="floating-dot dot3"></div>
      <div className="floating-dot dot4"></div>
      <div className="floating-dot dot5"></div>
    </div >
  );
};

export default Mentors;


// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Mentors.css";
// import Carousel from "react-bootstrap/Carousel";

// // Dummy mentor data
// const mentors = [
//     { id: 1, name: "Jack Thomson", title: "President", image: "https://via.placeholder.com/120" },
//     { id: 2, name: "Emily Carter", title: "Mentor", image: "https://via.placeholder.com/120" },
//     { id: 3, name: "Alex Johnson", title: "Senior Mentor", image: "https://via.placeholder.com/120" },
//     { id: 4, name: "Sarah Parker", title: "Junior Mentor", image: "https://via.placeholder.com/120" },
//     { id: 5, name: "Michael Brown", title: "Teacher", image: "https://via.placeholder.com/120" }
// ];

// const Mentors = () => {
//     return (
//         <div className="mentors-container container my-5 py-5 text-center">
//             <h1 className="fw-bold mb-3">Our teachers and mentors</h1>
//             <p className="text-muted mb-5">We work hard to help you achieve your goals.</p>

//             <Carousel indicators={false} className="mentor-carousel" interval={3000}>
//                 {mentors.map((mentor) => (
//                     <Carousel.Item key={mentor.id}>
//                         <div className="mentor-slide d-flex justify-content-center align-items-center">
//                             <div className="mentor-image-wrapper">
//                                 <img
//                                     src={mentor.image}
//                                     alt={mentor.name}
//                                     className="mentor-image rounded-circle"
//                                 />
//                             </div>
//                         </div>
//                         <div className="mentor-details mt-4">
//                            <h5 className="fw-bold"> {mentor.name}</h5>
//                         <p className="text-muted">{mentor.title}</p>
//                         <p className="text-muted">Your text</p>
//                     </div>
//           </Carousel.Item>
//         ))}
//         </Carousel>
//     </div >
//   );
// };

// export default Mentors;