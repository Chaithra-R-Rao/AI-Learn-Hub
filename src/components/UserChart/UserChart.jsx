import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserChart = ({ groupedUsers }) => {
    const [courseData, setCourseData] = useState({ labels: [], counts: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesRes, enrolledRes] = await Promise.all([
                    axios.get('http://localhost:5000/courses'),
                    axios.get('http://localhost:5000/enrolled-courses'),
                ]);

                const courses = coursesRes.data; // array of { id, title }
                const enrolledCourses = enrolledRes.data; // array of { courseId }

                // Map courseId to course title
                const idToTitleMap = {};
                courses.forEach((course) => {
                    idToTitleMap[course.id] = course.title || 'Untitled';
                });

                const enrollmentCounts = enrolledCourses.reduce((acc, enrollment) => {
                    const courseTitle = idToTitleMap[enrollment.courseId] || 'Unknown Course';
                    acc[courseTitle] = (acc[courseTitle] || 0) + 1;
                    return acc;
                }, {});

                const labels = Object.keys(enrollmentCounts);
                const counts = Object.values(enrollmentCounts);

                setCourseData({ labels, counts });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Pie Chart: User Roles
    const roleLabels = Object.keys(groupedUsers);
    const roleCounts = Object.values(groupedUsers).map((users) => users.length);

    const pieData = {
        labels: roleLabels,
        datasets: [
            {
                label: 'User Roles',
                data: roleCounts,
                backgroundColor: ['#f0ad4e', '#5bc0de', '#d9534f'],
                borderRadius: 6,
            },
        ],
    };

    // Bar Chart: Course-wise enrollments
    const barData = {
        labels: courseData.labels,
        datasets: [
            {
                label: 'Enrollments',
                data: courseData.counts,
                backgroundColor: [
                    'rgba(69, 201, 76, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgb(62, 187, 83)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: 'Course-wise Enrollments' },
        },
        scales: {
            y: { beginAtZero: true },
            x: {
                title: {
                    display: true,
                    text: 'Courses',
                },
            },
        },
    };

    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <div className="card p-3 shadow" style={{ height: '400px' }}>
                    <h5 className="text-center">User Roles</h5>
                    <div style={{ width: '350px', height: '350px', margin: '0 auto' }}>
                        <Pie key={JSON.stringify(pieData)} data={pieData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-4">
                <div className="card p-3 shadow" style={{ height: '400px' }}>
                    <h5 className="text-center">Course vs Student</h5>
                    <Bar key={JSON.stringify(barData)} data={barData} options={barOptions} />
                </div>
            </div>
        </div>
    );
};

export default UserChart;
