import React from 'react'
import './Courses.css';

export default function CourseCards({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-5">
                <h4>No courses found.</h4>
            </div>
        );
    }
    return (
        <div className="row">
            {data.map(course => (
                <div className="col-md-4 mb-4" key={course.id}>
                    <div className="card h-100 shadow-sm">
                        <img src={`${process.env.PUBLIC_URL}/Images/${course.image}`} className="card-img-top" alt={course.title} />
                        <div className="card-body">
                            <h5 className="card-title">{course.title}</h5>
                            <p className="card-text text-muted">{course.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
