import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Slider.css';
 
export default function Slider() {

    const slides = [
        {
            id: 1,
            title: "Autonomous Systems",
            image: `${process.env.PUBLIC_URL}/Images/autonomous-system.png`,
            description: "This includes self-driving cars and drones that can operate without human intervention."
        },
        {
            id: 2,
            title: "Machine Learning (ML)",
            image: `${process.env.PUBLIC_URL}/Images/machine-learning.png`,
            description: "This involves algorithms that allow computers to learn from and make predictions based on data."
        },
        {
            id: 3,
            title: "Generative AI ",
            image: `${process.env.PUBLIC_URL}/Images/genai.jpg`,
            description: "Systems capable of creating new content, such as text, images, music, or code, based on patterns learned from data."
        }
    ];

    return (
        <div className="slider-container my-3 py-3">
            <Carousel indicators={false} interval={3000}>
                {slides.map(slide => (
                    <Carousel.Item key={slide.id}>
                        <div className="slide-overlay">
                            <h2 className="slider-header">{slide.title}</h2>
                            <p className="slider-description">{slide.description}</p>
                        </div>
                        <img
                            className="d-block w-100"
                            src={slide.image}
                            alt={slide.title}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div >
    )
}
