import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Courses from '../Courses/Courses';

export default function CoursesPage() {
    const { category } = useParams(); // 'supervised', 'unsupervised', 'semisupervised'
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`http://localhost:5000/${category}`)
            .then(response => {
                setCourses(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                setError('Failed to load courses.');
                setLoading(false);
            });

    }, [category]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 text-capitalize">{category} Learning</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-danger text-center">{error}</p>}
            {!loading && !error && <Courses data={courses} />}
        </div>
    );
}
